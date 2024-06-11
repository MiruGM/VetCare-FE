import { useState, useEffect } from "react";
import { peticionGET } from "../utils/ajax";
import { useAuthStore } from '../hooks/useAuthStore';

function useFetchClientByIdData() {
    const [clientData, setClientData] = useState({
        id: '',
        name: '',
        email: '',
        dni: '',
        phone: '',
        password: '',
        pets: [],
    });

    const { clientId } = useAuthStore();

    // Recoger la información del cliente
    useEffect(() => {

        async function fetchData() {
            let params = new FormData();
            params.append('client', "true");

            let response = await peticionGET('clients/' + clientId, params);

            if (response.ok) {
                const data = response.data;
                setClientData(data);
            }
        }

        fetchData();

    }, [clientId]);

    return clientData;

}

export default useFetchClientByIdData;