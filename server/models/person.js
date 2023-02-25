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
	name: {
		type: String,
		minLength: 3,
		required: [true, "name is missing"],
	},

	// A phone number must be formed of two parts that are separated by -
	// the first part must only have two or three numbers
	// the second part also consists of numbers that must has length of 6 or more
	// eg. 09-1234556 and 040-22334455              are valid
	// eg. 1234556, 1-22334455 and 10-22-334455     are invalid
	number: {
		type: String,
		required: [true, "phone number is missing"],
		validate: {
			validator: function (v) {
				return /\d{2,3}-\d{6,}/.test(v);
			},
			message: (props) => `${props.value} is not a valid phone number!`,
		},
	},
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
