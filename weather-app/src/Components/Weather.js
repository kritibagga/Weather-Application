import React from "react";
import "./styles.css";

import moment from "moment";

const Weather = ({ weatherData }) => {
	const timezone = weatherData.timezone;
	const now_utc = moment.utc();
	const local_time = now_utc.utcOffset(timezone / 60);

	return (
		<div className='wrapper'>
			<h1>
				<div className='city-name'>
				<span>
					<i className='location fas fa-map-marker-alt' />
				</span>
				{weatherData.name}
				</div>
				<span className='feels'>
					Feels {Math.floor(weatherData.main.feels_like)}&deg;C
				</span>
			</h1>
			<div className='wrapper1'>
				<div className='image'>
					<img
						src={`${process.env.REACT_APP_ICON_URL}${weatherData.weather[0].icon}@4x.png`}
						alt={weatherData.weather[0].description}
					/>
					<p className='description'>{weatherData.weather[0].description}</p>
					<p className='temp'>{Math.floor(weatherData.main.temp)}&deg;C</p>
					<p className='date'>
						{weatherData.timezone === "--" ? "--" : local_time.format("LLL")}
					</p>
				</div>

				<div className='details'>
					<p className='grid'>
						<i className=' icons fas fa-temperature-high' />
						Max Temp: {Math.floor(weatherData.main.temp_max)}&deg;C
					</p>
					<p className='grid'>
						<i className=' icons fas fa-temperature-low' />
						Min Temp: {Math.floor(weatherData.main.temp_min)}&deg;C
					</p>
					<p className='grid'>
						<i className=' icons fas fa-tint' /> Humidity:
						{weatherData.main.humidity} %
					</p>
					<p className='grid'>
						<i className=' icons fas fa-wind' />
						Wind Speed: {weatherData.wind.speed} m/s
					</p>
				</div>
			</div>
		</div>
	);
};
export default Weather;
