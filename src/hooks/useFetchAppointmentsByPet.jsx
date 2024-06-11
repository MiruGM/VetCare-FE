import { useEffect, useState } from "react";
import { peticionGET } from "../utils/ajax";

function useFetchAppointmentsByPetData({ petId, reload }) {
    const [appointmentsData, setAppointmentsData] = useState([]);

    useEffect(() => {

        async function fetchAppointmentData() {
            let params = new FormData();
            params.append("appointmentID", "true");

            let response = await peticionGET('appointments/pet/' + petId, params);

            if (response.ok) {
                setAppointmentsData(response.data);
            }
        }

        fetchAppointmentData();
    }, [petId, reload]);

    return appointmentsData;
}

export default useFetchAppointmentsByPetData;