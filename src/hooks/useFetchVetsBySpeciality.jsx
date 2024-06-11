import { useState, useEffect } from "react";
import { peticionGET } from "../utils/ajax";

function useFetchVetsBySpecialityData({ speciality }) {
    const [veterinarians, setVeterinarians] = useState([]);

    //Recoger los veterinarios de la especialidad seleccionada
    useEffect(() => {

        async function fetchVetData() {
            let params = new FormData();

            let response = await peticionGET('veterinarians/speciality/' + speciality, params);

            if (response.ok) {
                const data = response.data;
                setVeterinarians(data);
            }
        }

        fetchVetData();

    }, [speciality]);

    return veterinarians;
}

export default useFetchVetsBySpecialityData; 