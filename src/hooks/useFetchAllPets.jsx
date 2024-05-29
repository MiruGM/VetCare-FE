import { useState, useEffect } from "react";
import { peticionGET } from "../utils/ajax";

function useFetchAllPetsData() {
	const [pets, setPets] = useState([]);

	useEffect(() => {
		async function fetchAllPetsData() {
			let params = new FormData();
			params.append("petId", "true");

			let response = await peticionGET('pets/', params);

			if (response.ok) {
				const data = response.data;
				setPets(data);
			}
		}

		fetchAllPetsData();
	}, []);

	return pets;
}

export default useFetchAllPetsData;