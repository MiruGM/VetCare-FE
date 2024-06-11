import { useState, useEffect } from "react";
import { peticionGET } from "../utils/ajax";

function useFetchAllAppointmentsAfterData({ reload, currentDate }) {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    async function fetchAppByDateData() {
      let params = new FormData();
      params.append("list", "true");

      let response = await peticionGET("appointments/date/after/" + currentDate, params);

      if (response.ok) {
        const data = response.data;
        setAppointments(data);
      }

    }
    fetchAppByDateData();

  }, [reload, currentDate]);
  return appointments;
}

export default useFetchAllAppointmentsAfterData; 