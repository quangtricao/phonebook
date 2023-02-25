const Persons = ({ persons }) => {
	return (
		<>
			<h2>Numbers</h2>

			{persons.map((person) => (
				<div key={person.name}>
					{person.name} {person.number}
				</div>
			))}
		</>
	);
};

export default Persons;
