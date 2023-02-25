const Persons = ({ persons, handleDelete }) => {
	return (
		<>
			<h2>Numbers</h2>

			{persons.map((person) => (
				<div key={person.name}>
					{person.name} {person.number}{" "}
					<button onClick={() => handleDelete(person.id)}>
						delete
					</button>
				</div>
			))}
		</>
	);
};

export default Persons;
