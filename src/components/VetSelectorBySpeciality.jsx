import useFetchVetsBySpacialityData from "../hooks/useFetchVetsBySpeciality";
import { useState, } from "react";

import { Select, MenuItem } from "@mui/material";


function VetSelectorBySpeciality({ appointmentData, handleBtnClick }) {
  const [speciality, setSpecialty] = useState('domestico');

  const veterinarians = useFetchVetsBySpacialityData({ speciality });

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
          onChange={(e) => { setSpecialty(e.target.value); }}
        >
          <MenuItem value="domestico">Vet. Doméstico</MenuItem>
          <MenuItem value="exotico">Vet. Animales Exóticos</MenuItem>
          <MenuItem value="aves">Vet. Aves</MenuItem>

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
                      <div key={vet.id} className="col-12 col-md-6">
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