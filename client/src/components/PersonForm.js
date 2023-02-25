const PersonForm = ({
  addPerson,
  name,
  number,
  handleNameChange,
  handleNumberChange,
}) => (
  <>
    <form onSubmit={addPerson}>
      <div>
        name <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number <input value={number} onChange={handleNumberChange} />
      </div>
      <button type="submit">add</button>
    </form>
  </>
);

export default PersonForm;
