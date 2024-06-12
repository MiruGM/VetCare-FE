import { useState, useEffect } from "react";
import { peticionGET } from "../utils/ajax";

function useFetchVetByIdData({ vetId }) {
    const [vetData, setVetData] = useState({
        id: '',
        registrationNumber: '',
        name: '',
        email: '',
        password: '',
        speciality: 'Doméstico',
        admin: 0
    });

    //Recoger los veterinarios de la especialidad seleccionada
    useEffect(() => {

        async function fetchVetData() {
            let params = new FormData();

            let response = await peticionGET("veterinarians/" + vetId, params);

            if (response.ok) {
                const data = response.data;
                setVetData(data);
            }
        }

        fetchVetData();
    }, [vetId]);

    console.log("Vet data: ", vetData);

    return [vetData, setVetData];
}

export default useFetchVetByIdData; 