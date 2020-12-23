import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const CountryView = ({ country }) => {
	const [weather, setWeather] = useState({});

	useEffect(() => {
		const key = process.env.REACT_APP_WEATHER_API_KEY;
        const apiUrl = `http://api.weatherstack.com/current?access_key=${key}&query=${country.capital}`;
		axios.get(apiUrl).then((response) => {
            const resCurrent = response.data.current;
			const resWeather = {
				temp: resCurrent.temperature,
				wind_dir: resCurrent.wind_dir,
				wind_speed: resCurrent.wind_speed,
				icons: resCurrent.weather_icons,
			};
			setWeather(resWeather);
		});
	}, [country.capital]);
	return (
		<div>
			<h2>{country.name}</h2>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>
			<h3>Languages</h3>
			<ul>
				{country.languages.map((lang) => (
					<li key={lang.iso639_2}>{lang.name}</li>
				))}
			</ul>
			<img src={country.flagurl} style={{ height: 200 }} alt="" />
            <h3>Weather in {country.capital}</h3>
            <Weather weather={weather} />
		</div>
	);
};

export default CountryView;
