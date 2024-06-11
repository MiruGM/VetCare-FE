// import { useState, useEffect } from "react";
// import { peticionGET } from "../utils/ajax";

// function useFetchAllAppointments({ reload }) {
// 	const [appointments, setAppointments] = useState([]);
// 	useEffect(() => {
// 		async function fetchData() {
// 			let params = new FormData();
// 			params.append("list", "true");

// 			let response = await peticionGET("appointments", params);

// 			if (response.ok) {
// 				const data = response.data;
// 				setAppointments(data);
// 			}
// 		}

// 		fetchData();
// 	}, [reload]);
// 	return appointments;

// }

// export default useFetchAllAppointments;