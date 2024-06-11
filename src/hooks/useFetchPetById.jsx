import { useState, useEffect } from "react";
import { peticionGET } from "../utils/ajax";

function useFetchPetByIdData({ petId }) {
    const [petData, setPetData] = useState({
        id: '',
        registrationNumber: '',
        name: '',
        birthDate: '',
        sex: '',
        type: '',
        species: '',
        breed: '',
        clientId: '',
    });

    //Recoger la información de la mascota 
    useEffect(() => {
        async function fetchPetData() {
            let params = new FormData();
            params.append("petId", "true");

            let response = await peticionGET('pets/' + petId, params);

            if (response.ok) {
                const data = response.data;
                setPetData(data);
            }
        }

        fetchPetData();
    }, [petId]);

    return petData;
}

export default useFetchPetByIdData;