// A single example file demonstrates the working flow with MongoDB
const mongoose = require("mongoose");

// take password from the second command line parameter
const password = process.argv[2];

// the address of the database
const url = `mongodb+srv://quangtricao:${password}@cluster0.kvzjilt.mongodb.net/phoneBook?retryWrites=true&w=majority`;

// A schema definition for a person, stored in the personSchema variable
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Person model definition
const Person = mongoose.model("Person", personSchema);
// The first 'Person' parameter is the singular name of the model
// The name of the collection will be the lowercase plural: 'people', due to the Mongoose convention
// while the Schema refers to them is in the singular (e.g. Person).



// Use the program (this file) by passing three command-line arguments
// node mongo.js     fails
if (process.argv.length < 3) {
  console.log("Please provide the password as an argument: node mongo.js <password>");
  process.exit(1);
}

// node mongo.js mypassword                                   displays all the entries in the phonebook
// node mongo.js mypassword quangtricao 045-1232456           adds the new entry to the database
// node mongo.js mypassword "Quang Tri Cao" 045-1232456     the name contains whitespace characters must be enclosed in quotes
if (process.argv.length === 3) {
  mongoose.set("strictQuery", true);
  console.log("connecting to", url);
  mongoose.connect(url).then(
    Person.find({ show: true }).then((result) => {
      console.log("phonebook: ");
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    })
  );
} else {
  mongoose.set("strictQuery", true);
  console.log("connecting to", url);
  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        show: true,
      });

      return person.save();
    })
    .then(() => {
      console.log(
        `add ${process.argv[3]} ${process.argv[4]} to phonebook`
      );
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
