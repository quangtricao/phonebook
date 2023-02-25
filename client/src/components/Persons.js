import { Table, Button } from "react-bootstrap";

const Persons = ({ persons, handleDelete }) => {
	return (
		<>
			<h2>Numbers</h2>
      
			<Table hover striped>
				<tbody>
					{persons.map((person) => (
						<tr key={person.name}>
							<td>{person.name}</td>
							<td>{person.number}</td>
							<td>
								<Button
                  style={{ background: "#ff4d4d", border: "none" }}
									onClick={() => handleDelete(person.id)}
                >
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default Persons;
