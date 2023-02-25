const express = require("express");
const app = express(); // Create an express application stored in the app variable.
require("dotenv").config(); // To use the environment variables defined in the .env file
const cors = require("cors");
const Person = require("./models/person");

app.use(cors());
// To use the Cross-origin resource sharing (CORS) mechanism

app.use(express.json());
// The json-parser takes the JSON data of a request, transforms it into a JavaScript object
// then attaches it to body property of request object
// Therefore, it must be called before all route handlers, otherwise the body property of request object will be undefined.

app.get("/info", (request, response) => {
	Person.find({}).then((person) => {
		response.send(
			`<div>Phonebook has info for ${person.length} people</div>
		<br/>
		<div>${Date().toString()}</div>`
		);
	});
});

app.get("/api/persons", (req, res) => {
	Person.find({}).then((persons) => {
		res.json(persons);
	});
});

app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			res.json(person);
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const newPerson = request.body;

	Person.findByIdAndUpdate(request.params.id, newPerson, {
		runValidators: true,
	})
		.then((updatedPerson) => {
			response.json(updatedPerson);
		})
		.catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
	const { name, number } = req.body;

	const person = new Person({
		name,
		number,
	});

	person
		.save()
		.then((person) => {
			res.json(person);
		})
		.catch((error) => next(error));
});

// The middleware handles unsupported routes responds to all requests with 404 unknown endpoint.
// Therefore, it must be next to the last middleware, the error handler,
// otherwise no routes or middleware will be called.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// Catch and handle all errors that are passed forward with the next() function
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

// Bind the server to listen to HTTP requests sent to the environment variable PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
