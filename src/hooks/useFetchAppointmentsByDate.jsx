import { useEffect, useMemo, useState } from "react";
import { peticionGET } from "../utils/ajax";


function useFetchAppointmentsByDateData({ appointmentData }) {
    const [availableHours, setAvailableHours] = useState([]);

    const defaultHours = useMemo(() => {
        return [
            '10:00:00',
            '10:30:00',
            '11:00:00',
            '11:30:00',
            '12:00:00',
            '12:30:00',
            '13:00:00',
            '17:30:00',
            '18:00:00',
            '18:30:00',
            '19:00:00',
            '19:30:00',
            '20:00:00',
            '20:30:00'];
    }, []);

    //Recoger las horas de las citas ya alojadas en las base de datos
    useEffect(() => {

        async function fetchAppByDateData() {
            if (appointmentData.date !== "") {
                let params = new FormData();
                let response = await peticionGET('appointments/date/' + appointmentData.date, params);

                if (response.ok) {
                    const data = response.data;
                    const unavailableHours = data.map((appointment) => appointment.time);
                    const availableHours = defaultHours.filter(hour => !unavailableHours.includes(hour));
                    setAvailableHours(availableHours);
                } else {
                    setAvailableHours(defaultHours);
                }
            }
        }
        fetchAppByDateData();

    }, [appointmentData.date, defaultHours, setAvailableHours]);

    return availableHours;
}

export default useFetchAppointmentsByDateData;