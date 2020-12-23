import React, { useState, useEffect } from "react";

const Weather = ({ weather }) => {

    const [imageLoaded, setImageLoaded] = useState(false)
    
    useEffect(() => {
        if(weather.icons !== undefined) {
            setImageLoaded(true)
        }
    }, [weather.icons])
    return (
        <div>
            <p><strong>Temperature:</strong> {weather.temp} Celsius</p>
            <p><strong>Wind:</strong> {weather.wind_speed} km/h {weather.wind_dir}</p>
            {imageLoaded && <img src={weather.icons[0]} alt="" />}
        </div>
    )
}

export default Weather;