export async function getCityLatLng(searchInput, country) {
	try {
		const response = await fetch(
			`${process.env.REACT_APP_GEO_API_URL}${searchInput},${country}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
		);
		const data = await response.json();

		if (data.length === 0) {
			throw new Error("No location found");
		}

		const { lat, lon } = data[0];

		return { lat, lon };
	} catch (error) {
		console.error(error);
	}
}
