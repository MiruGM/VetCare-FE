import { useState, useEffect } from "react";
import { peticionGET } from "../utils/ajax";

function useFetchAllClientsData() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let params = new FormData();
            params.append("list", "true");

            let response = await peticionGET("clients", params);

            if (response.ok) {
                const data = response.data;
                setClients(data);
            }
        }

        fetchData();

    }, []);

    return clients;
}

export default useFetchAllClientsData; 