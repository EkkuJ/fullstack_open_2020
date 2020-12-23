import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
import CountryView from "./components/CountryView";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState("");

	const matchingCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(filter.toLowerCase())
	);
	const nOfCountries = matchingCountries.length;

	useEffect(() => {
		axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
			const usedData = response.data.map((country) => ({
				name: country.name,
				code: country.alpha3Code,
				capital: country.capital,
				population: country.population,
				languages: country.languages,
				flagurl: country.flag 

			}));
			setCountries(usedData);
		});
	}, []);

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	return (
		<div>
			<h1>Country data</h1>
			<Filter value={filter} handleChange={handleFilterChange} />
			{nOfCountries > 10 && (
				<p>Too many many matches, specify another filter</p>
			)}
			{nOfCountries > 1 && nOfCountries <= 10 && (
				<CountryList countries={matchingCountries} />
			)}
			{nOfCountries === 1 && (
				<CountryView country={matchingCountries[0]} />
			)}
			{nOfCountries === 0 && <p>No matches, specify another filter</p>}
		</div>
	);
};

export default App;
