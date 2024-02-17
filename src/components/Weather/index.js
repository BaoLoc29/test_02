import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import ListIcon from '../../icon/ListIcon';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);
    const apiKey = '53d2b9e5ffc4c41135c1487777c28306';

    const fetchWeatherData = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
            .then(response => {
                setWeatherData(response.data);
                setError(false);
            })
            .catch(error => {
                console.error('Đây là lỗi:', error);
                setError(true);
            });
    };

    const getWeatherIcon = (weatherType) => {
        const icon = ListIcon.find(item => item.type === weatherType);
        return icon ? icon.img : null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    const handleOnChange = (e) => {
        setLocation(e.target.value);
    }

    return (
        <div className="weather">
            <form className="search-box" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={location}
                    onChange={handleOnChange}
                    placeholder="Enter your location" />
                <button className="btn-search" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            {error && (
                <div className='weather-result'>
                    <img className="error" src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-7621869-6167023.png?f=webp" alt='error-icon' />
                </div>
            )}
            {weatherData && !error && (
                <div className='weather-result'>
                    <h2>{weatherData.name},{weatherData.sys.country}</h2>
                    <img src={getWeatherIcon(weatherData.weather[0].main)} alt='name-weather' />
                    <p>{weatherData.weather[0].main}</p>
                    <p><i className="fa-solid fa-temperature-three-quarters"></i> {weatherData.main.temp}°C</p>
                    <hr />
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Pressure: {weatherData.main.pressure} hPa</p>
                    <p>Feels Like: {Math.round((weatherData.main.feels_like - 273.15) * 10) / 10 + '°C'}</p>
                    <p>Wind direction: {weatherData.wind.deg} km/h</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    <p>Cloud Coverage: {weatherData.clouds.all}%</p>
                </div>
            )}
        </div>
    );
};

export default Weather;

