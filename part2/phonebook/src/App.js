import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import numberService from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [notification, setNotification] = useState(null);
	const [success, setSuccess] = useState(false);

	const personsShown =
		filter === ""
			? persons
			: persons.filter((person) =>
					person.name.toLowerCase().includes(filter.toLowerCase())
			  );
	const refreshNumbers = () => {
		numberService
			.getAll()
			.then((initialNumbers) => setPersons(initialNumbers))
			.catch(() => {
				setSuccess(false);
				showNotification(`Failed to get the numbers from the server`);
			});
	};

	useEffect(() => {
		refreshNumbers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const showNotification = (notification) => {
		setNotification(notification);
		setTimeout(() => {
			setNotification(null);
		}, 3000);
	};

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
		const newPerson = {
			name: newName,
			number: newNumber,
		};

		if (names.includes(newName)) {
			const alert = `${newName} is already added to the phonebook. Replace the old number with the new one?`;
			if (window.confirm(alert)) {
				const id = persons.find((person) => person.name === newName).id;
				numberService
					.update(id, newPerson)
					.then((response) => {
						setPersons(
							persons.map((person) =>
								person.id !== id ? person : response
							)
						);
						setSuccess(true);
						showNotification(
							`Successfully updated the number of ${newName}`
						);
					})
					.catch(() => {
						setSuccess(false);
						showNotification(
							`Number of ${newName} has already been removed from the phonebook.`
						);
						refreshNumbers();
					});
			}
		} else {
			numberService
				.create(newPerson)
				.then((response) => {
					setPersons(persons.concat(response));
					setNewName("");
					setNewNumber("");
					setSuccess(true);
					showNotification(
						`Successfully added ${newName} to the phonebook`
					);
				})
				.catch(() => {
					setSuccess(false);
					showNotification(
						`Number of ${newName} has already been removed from the phonebook.`
					);
					refreshNumbers();
				});
		}
	};

	const deletePerson = (id) => {
		const deletedName = persons.find((person) => person.id === id).name;
		if (
			window.confirm(
				`Do you really want to delete ${deletedName} from the phonebook?`
			)
		) {
			numberService
				.deleteId(id)
				.then((response) => {
					const deletedId = response.config.params.id;
					const newPersons = persons.filter(
						(person) => person.id !== deletedId
					);
					setPersons(newPersons);
				})
				.catch(() => {
					setSuccess(false);
					showNotification(
						`Number of ${newName} has already been removed from the phonebook.`
					);
				});
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
			<Notification success={success} message={notification} />
			<Persons persons={personsShown} handleDelete={deletePerson} />
		</div>
	);
};

export default App;
