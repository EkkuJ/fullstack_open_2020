import React, { useState } from "react";
import CountryView from "./CountryView"

const CountryList = ({ countries }) => {
    const [shownCountry, setShownCountry] = useState({});
    const [countryChosen, setCountryChosen] = useState(false);

    const handleShowCountry = (country) => {
        setShownCountry(country)
        setCountryChosen(true)
    }
    
    if(countryChosen) {
        return (
            <div>
                {countries.map((country) => (
                    <div key={country.code}>
                        <p>
                            {country.name} <button onClick={() => handleShowCountry(country)}>show</button>
                        </p>
                    </div>
                ))}
                <CountryView country={shownCountry} />
            </div>
        )
    }
    return (
        <div>
            {countries.map((country) => (
                <div key={country.code}>
                    <p>
                        {country.name} <button onClick={() => handleShowCountry(country)}>show</button>
                    </p>
                </div>
            ))}
        </div>
    )
}

export default CountryList;