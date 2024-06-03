import useFetchClientByIdData from "../hooks/useFetchClientById";

import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


function ClientData({ appointmentData, handleBtnClick }) {
  const clientData = useFetchClientByIdData();

  return (
    <div >
      <div>
        <h2 className="title text-center">Datos del Cliente</h2>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-12 ">
            <span className="d-block overTitle text-center"> {clientData.name}</span>
            <span className="d-block small-text text-center"> ({clientData.dni})</span>

          </div>
          <div className="col-12 col-sm-6 d-flex justify-content-center justify-content-md-end mt-3">
            <PhoneIphoneRoundedIcon />
            <span className="text-break ms-2">{clientData.phone}</span>

          </div>
          <div className="col-12 col-sm-6 d-flex justify-content-center justify-content-md-start mt-3 ">
            <MailOutlineIcon />
            <span className="text-break ms-2">{clientData.email}</span>
          </div>

          <div className="col-12 mt-3">

            <h6 className="text-center fw-bold">Mascota a tratar:</h6>
            <div className="d-flex justify-content-center">
              {
                clientData.pets.map((pet) => {
                  return (
                    <div key={pet.id} className={appointmentData.petId === pet.id ? "custom-chip custom-chip__selected" : "custom-chip"} onClick={() => handleBtnClick('petId', pet.id)}>
                      {pet.name}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ClientData; 