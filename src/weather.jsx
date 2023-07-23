import React, { useState } from 'react';
import './weather.css'

const api = {
    key: "db597f2fab69580a2ebe82c3a945e656",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    // const search = evt => {
    //     if (evt.key === "Enter") {
    //         fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
    //             .then(res => res.json())
    //             .then(result => {
    //                 setWeather(result);
    //                 setQuery('');
    //                 console.log(result);
    //             })
    //     }
    // }
    const search = async (evt) => {
        if (evt.key === "Enter") {
            try {
                const response = await fetch(`${api.base}weather?q=${query}&appid=${api.key}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setWeather(result);
                setQuery('');
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };
    

    const dateBuilder = (d) => {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div>
            <h1>Weather App</h1>
            <main>
                <div className='search-box'>
                    <input
                        type='text'
                        className='search-bar'
                        placeholder='Search..'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined")?(
                    <div className="location-box">
                    {/* loaction show part */}
                    <div className="location">
                        {weather.name}, {weather.sys?.country}
                    </div>
                    {/* days part */}
                    <div className="date">
                        {dateBuilder(new Date())}

                    </div>
                    <div className="weather-box">
                        <div className="temp">
                            {Math.round(weather.main.temp)}°C
                        </div>
                        <div className="weather">
                            {weather.weather[0].main}
                        </div>
                    </div>
                </div>
                ) : ('')}
                
            </main>
        </div>
    )
}

export default Weather;
