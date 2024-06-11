import { useState, useEffect } from "react";
import { peticionGET } from "../utils/ajax";

function useFetchAllAppointmentsBeforeData({ reload, currentDate }) {
    console.log()
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        async function fetchAppByDateData() {
            let params = new FormData();
            params.append("list", "true");

            let response = await peticionGET("appointments/date/before/" + currentDate, params);

            if (response.ok) {
                const data = response.data;
                setAppointments(data);
            }

        }
        fetchAppByDateData();

    }, [reload, currentDate]);
    return appointments;
}

export default useFetchAllAppointmentsBeforeData; 