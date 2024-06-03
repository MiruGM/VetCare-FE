import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { peticionPOSTJSON } from "../utils/ajax";

import { Divider } from "@mui/material";
import ClientData from "./ClientData";
import VetSelectorBySpeciality from "./VetSelectorBySpeciality";
import TimeDateSelector from "./TimeDateSelector";

function AddAppointment() {
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    reason: 'Revisión',
    petId: 0,
    veterinarianId: 0
  });

  const handleBtnClick = (name, value) => {
    if (name === 'date') {

      value = value.split(' ')[1];
    }
    setAppointmentData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await peticionPOSTJSON('appointments', appointmentData);

    alert(response.message);

    if (response.ok) {
      navigate("/petprofile/" + appointmentData.petId);
    }
  };

  console.log(appointmentData);
  return (
    <div className="custom-container custom-container__md-main pt-4 px-4 pb-3 mb-5">

      <ClientData appointmentData={appointmentData} handleBtnClick={handleBtnClick} />

      <Divider className="long-divider mt-4 mb-4" />

      <VetSelectorBySpeciality appointmentData={appointmentData} handleBtnClick={handleBtnClick} />

      <Divider className="long-divider mt-4 mb-4" />

      <TimeDateSelector appointmentData={appointmentData} setAppointmentData={setAppointmentData} handleBtnClick={handleBtnClick} />

      <div className="custom-container custom-container__button mt-4">
        <button
          type="submit"
          className="custom-btn"
          onClick={handleSubmit}>
          Agendar Cita
        </button>
      </div>
    </div >
  );
}


export default AddAppointment;