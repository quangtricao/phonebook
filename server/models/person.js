const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", true);
// DeprecationWarning: Mongoose: the `strictQuery` option w ill be switched back to `false` by default in Mongoose 7
// Use `mongoose.set('strictQuery', false);` if you want to prepare for this change.
// Or use `mongoose.set('strictQuery', true);` to suppress this warning.

console.log("connecting to", url);

mongoose
	.connect(url)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

// Modify the toJSON() method of the schema to format the objects returned by Mongoose,
// which is used on all instances of the models produced with the schema.
personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Person", personSchema);
