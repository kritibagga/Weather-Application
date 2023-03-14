import "./App.css";
import "./Components/styles.css";
import React, { useEffect, useState } from "react";
import Weather from "./Components/Weather.js";
import { getCityLatLng } from "./Components/getCityName.js";

function App() {
	const [data, setData] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [country, setCountry] = useState("");
	const [lat, setLat] = useState([]);
	const [lon, setLon] = useState([]);

	const handleChange = (e) => {
		e.preventDefault();
		const input = e.target.value;
		setSearchInput(input);
	};

	const handleCountry = (e) => {
		e.preventDefault();
		const country = e.target.value;
		setCountry(country);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		getWeather();
	};

	const handleRefresh = (e) => {
		e.preventDefault();
		window.location.reload();
	};
	useEffect(() => {
		const getLatLon = async () => {
			getCityLatLng(searchInput, country)
				.then(({ lat, lon }) => {
					setLat(lat);
					setLon(lon);
					console.log(`Latitude: ${lat}, Longitude: ${lon}`);
				})
				.catch((error) => {
					console.error(error);
				});
		};
		if (searchInput && country) {
			getLatLon();
		}
	}, [searchInput, country]);

	const getWeather = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
			);
			const data = await response.json();
			setData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	let nullData = {
		main: {
			feels_like: "0",
			temp: "0",
			temp_max: "0",
			temp_min: "0",
			humidity: "--",
		},
		name: "City Name",
		wind: {
			speed: "--",
		},
		timezone:"--",
		weather: [{ description: "Weather description", icon: "04n" }],
	};

	return (
		<div>
			<div className='search'>
				<form onSubmit={handleSearch}>
					<input
						className='input'
						type='search'
						placeholder='Type the City'
						onChange={handleChange}
						value={searchInput}
					/>
					<input
						className='country-input'
						type='search'
						placeholder='Type the Country'
						onChange={handleCountry}
						value={country}
					/>
					<button
						type='submit'
						className='button'>
						Get Weather
					</button>
					<button
						type='button'
						className='button'
						onClick={handleRefresh}>
						Reset
					</button>
				</form>
			</div>
			{typeof data.main !== "undefined" ? (
				<Weather weatherData={data} />
			) : (
				<>
					<Weather weatherData={nullData} />
				</>
			)}
		</div>
	);
}

export default App;
