const Persons = ({ persons, filter, deleteOnClick }) => {
  return persons.map((person) => {
    if (person.name.toLowerCase().includes(filter.toLowerCase()))
      return (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button key={person.id} onClick={deleteOnClick(person.id)}>
            delete
          </button>
        </p>
      );
  });
};
export default Persons;
