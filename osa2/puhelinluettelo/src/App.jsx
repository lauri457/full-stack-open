import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    personService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (
      existingPerson &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personService
        .update(existingPerson.id, { name: newName, number: newNumber })
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : returnedPerson
            )
          );
          addMessage(`Updated number of ${newName}`, "info");
          setNewName("");
          setNewNumber("");
        });
    } else if (!existingPerson) {
      personService
        .create({ name: newName, number: newNumber })
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        });
      addMessage(`Added ${newName}`, "info");
      setNewName("");
      setNewNumber("");
    }
  };

  const addMessage = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 2500);
  };

  const handleClick = (id) => () => {
    var person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`))
      return personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          addMessage(`Removed ${person.name}`, "info");
        })
        .catch((e) => {
          addMessage(
            `Information of ${person.name} has already been removed from server`,
            "danger"
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {notification.message ? (
        <Notification message={notification.message} type={notification.type} />
      ) : (
        ""
      )}
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
        <PersonForm
          addPerson={addPerson}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          newName={newName}
          newNumber={newNumber}
        />
      <Persons filter={filter} persons={persons} deleteOnClick={handleClick} />
    </div>
  );
};

export default App;
