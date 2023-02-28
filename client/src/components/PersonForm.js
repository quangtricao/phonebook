import { Form, InputGroup, Button } from "react-bootstrap";

const PersonForm = ({
	addPerson,
	name,
	number,
	handleNameChange,
	handleNumberChange,
}) => (
	<>
		<form onSubmit={addPerson}>
			<InputGroup className="my-2 w-50">
				<InputGroup.Text>Name: </InputGroup.Text>
				<Form.Control
					value={name}
					placeholder="Quang Tri Cao"
					onChange={handleNameChange}
				/>
			</InputGroup>
			<InputGroup className="my-2 w-50">
				<InputGroup.Text>Number: </InputGroup.Text>
				<Form.Control
					value={number}
					placeholder="040-2527025"
					onChange={handleNumberChange}
				/>
			</InputGroup>
			<Button
				style={{ background: "#00e64d", border: "none" }}
				className="my-2"
				type="submit"
			>
				Add
			</Button>
		</form>
	</>
);

export default PersonForm;
