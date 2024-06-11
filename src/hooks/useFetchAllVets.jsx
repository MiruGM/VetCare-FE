import { useState, useEffect } from "react";
import { peticionGET } from "../utils/ajax";

function useFetchAllVetsData({ reload }) {
    const [vets, setVets] = useState([]);

    useEffect(() => {
        async function fetchAllVetsData() {
            let params = new FormData();
            params.append("vetId", "true");

            let response = await peticionGET('veterinarians/', params);

            if (response.ok) {
                const data = response.data;
                setVets(data);
            }
        }

        fetchAllVetsData();
    }, [reload]);

    return vets;
}

export default useFetchAllVetsData;