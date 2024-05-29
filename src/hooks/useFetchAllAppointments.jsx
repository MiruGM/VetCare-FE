import { useState, useEffect } from "react";
import { peticionGET } from "../utils/ajax";

function useFetchAllAppointments() {
	const [appointments, setAppointments] = useState([]);
	useEffect(() => {
		async function fetchData() {
			let params = new FormData();
			params.append("list", "true");

			let response = await peticionGET("appointments", params);

			if (response.ok) {
				const data = response.data;
				setAppointments(data);
			}
		}

		fetchData();
	}, []);
	return appointments;

}

export default useFetchAllAppointments;