import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [notification, setNotification] = useState(null);

  // set Notification with default info type
	const notify = (message, type = "info") => {
		setNotification({ message, type });

		// set back to null after 3 seconds to make the noti disappear
		setTimeout(() => {
			setNotification(null);
		}, 3000);
	};

	const addPerson = (event) => {
		event.preventDefault(); // prevents the default behaviour of the form element

		const newPerson = {
			name: newName,
			number: newNumber,
		};

		setNewName("");
		setNewNumber("");

		const existingPerson = persons.find((person) => person.name === newPerson.name);

    // if newPerson's name already exists, update his/her number
    // else add newPerson to the persons state.
		if (existingPerson) {
			if (window.confirm(`${newPerson.name} is already added to phonebook, update the number?`)) {
        setPersons(persons.map((p) => p.id === existingPerson.id ? newPerson : p));
        notify(`Update number of ${existingPerson.name}`);
			} else return;
		} else {
      setPersons(persons.concat(newPerson));
      notify(`Add ${newPerson.name}`)
    }
  };

	// filter persons by name. If there is no letter to filter, return the whole list
	// else return the list that contains the letter
	const personsToShow = filter.length === 0
			? persons
			: persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()) );

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification notification={notification} />

			<div>
				Name filter{" "}
				<input value={filter} onChange={(event) => setFilter(event.target.value)} />
			</div>
			<br />

			<PersonForm
				name={newName}
				number={newNumber}
				handleNameChange={(event) => setNewName(event.target.value)}
				handleNumberChange={(event) => setNewNumber(event.target.value)}
				addPerson={addPerson}
			/>

			<Persons persons={personsToShow} />
		</div>
	);
};

export default App;
