import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const personsShown =
		filter === ""
			? persons
			: persons.filter((person) =>
					person.name.toLowerCase().includes(filter.toLowerCase())
			  );

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((response) => {
			setPersons(response.data);
		});
	}, []);

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();
		const names = persons.map((person) => person.name);
		if (names.includes(newName)) {
			const alert = `${newName} is already added to phonebook`;
			window.alert(alert);
		} else {
			const newPersons = persons.concat({
				name: newName,
				number: newNumber,
			});
			setPersons(newPersons);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filter} handleChange={handleFilterChange} />
			<h3>Add new</h3>
			<PersonForm
				nameValue={newName}
				numberValue={newNumber}
				handleSubmit={addPerson}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons persons={personsShown} />
		</div>
	);
};

export default App;
