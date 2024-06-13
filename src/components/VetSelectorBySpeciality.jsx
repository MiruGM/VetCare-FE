import useFetchVetsBySpacialityData from "../hooks/useFetchVetsBySpeciality";
import { useState, } from "react";

import { Select, MenuItem } from "@mui/material";


function VetSelectorBySpeciality({ appointmentData, handleBtnClick }) {
  const [speciality, setSpeciality] = useState('Doméstico');

  const veterinarians = useFetchVetsBySpacialityData({ speciality });
  console.log(veterinarians);
  return (
    <div>
      <div>
        <h2 className="title text-center" >Datos del Veterinario</h2>
      </div>

      <div>
        <h6 className="fw-bold">Elige la especialidad:</h6>
        <Select
          required
          fullWidth
          displayEmpty
          className="mb-2"
          id="speciality"
          name="speciality"
          labelId="speciality-label"
          value={speciality}
          onChange={(e) => { setSpeciality(e.target.value); }}
        >
          <MenuItem value="Doméstico">Vet. Doméstico</MenuItem>
          <MenuItem value="Exóticos">Vet. Animales Exóticos</MenuItem>
          <MenuItem value="Aves">Vet. Aves</MenuItem>

        </Select>

        <div>

          {
            veterinarians.length === 0
              ? <div className="d-flex justify-content-center mt-3">
                <span className="fw-bold">No hay veterinarios disponibles</span>
              </div>
              : <div className="container">
                <div className="row">
                  {veterinarians.map((vet) => {
                    return (
                      <div key={vet.id} className={veterinarians.length === 1 ? "col-12" : "col-12 col-md-6"}>
                        <div
                          className={appointmentData.veterinarianId === vet.id
                            ? "custom-list-style custom-list-style__selected"
                            : "custom-list-style custom-list-style__clickable"}
                          onClick={() => handleBtnClick('veterinarianId', vet.id)}>
                          <span className="d-block overTitle text-center">{vet.name}</span>
                        </div>
                      </div>
                    )
                  })
                  }
                </div>
              </div>
          }
        </div>
      </div>

    </div >
  );
}

export default VetSelectorBySpeciality;