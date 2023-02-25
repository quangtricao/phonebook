import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [notification, setNotification] = useState(null);

  // After the first render, fetch data from the server to render again but only once throughout the App component lifetime.
  useEffect(() => {
    personService.fetchData().then((persons) => {
      setPersons(persons);
    });
  }, []);

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
        personService
          .update(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          })
          .then((savedPerson) => {
            // replace the matched person in App's state with savedPerson from server
            setPersons(persons.map((p) => p.id === existingPerson.id ? savedPerson : p));

            notify(`Updated number of ${savedPerson.name}`);
          })
          .catch((error) => {
            notify(error.response.data.error, "error");
          });
			} else return;
		} else {
      personService
        .create(newPerson)
        .then((savedPerson) => {
          setPersons(persons.concat(savedPerson));
          notify(`Add ${savedPerson.name}`);
        })
        .catch((error) => {
          notify(error.response.data.error, "error");
        });
    }
  };

  const deletePerson = (id) => {
    const toDelete = persons.find((p) => p.id === id);

		if (window.confirm(`Delete ${toDelete.name}`)) {
			personService
				.remove(id)
				.then(() => {
					setPersons(persons.filter((p) => p.id !== id));
					notify(`Deleted ${toDelete.name}`);
				})
				.catch((error) => {
					notify(error.response.data.error, "error");
					setPersons(persons.filter((p) => p.id !== toDelete.id));
				});
		}
	};

	// filter persons by name. If there is no letter to filter, return the whole list
	// else return the list that contains the letter
	const personsToShow = filter.length === 0
			? persons
			: persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()));

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

			<Persons persons={personsToShow} handleDelete={deletePerson}/>
		</div>
	);
};

export default App;
