import useFetchClientByIdData from '../hooks/useFetchClientById';
import useFetchPetByIdData from '../hooks/useFetchPetById';
import useFetchAppointmentsByPetData from '../hooks/useFetchAppointmentsByPet';
import AppointmentHistory from './AppointmentHistory';
import TreatmentHistory from './TreatmentHistory';
import PetInfo from './PetInfo';

import { useState } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
import { useNavigate } from "react-router-dom";

import { Divider, Alert } from '@mui/material';


function PetProfile() {
  const navigate = useNavigate();
  const { petId, isVet } = useAuthStore();

  const [alert, setAlert] = useState(false);
  const [responseOk, setResponseOk] = useState(false);
  const [reload, setReload] = useState(false);

  const clientData = useFetchClientByIdData();
  const petData = useFetchPetByIdData({ petId });
  const appointmentsData = useFetchAppointmentsByPetData({ petId, reload });


  return (
    <div className="custom-container custom-container__md-main pt-4 px-4 mb-5">

      {
        alert && (responseOk
          ? (<div className="mb-3">
            <Alert severity="success">Cita eliminada correctamente.</Alert>
          </div>)
          : (<div className="mb-3">
            <Alert severity="error">Error al eliminar la cita.</Alert>
          </div>))
      }

      <PetInfo
        petData={petData}
        clientData={clientData} />

      <Divider className="long-divider mb-4" />

      <AppointmentHistory
        appointmentsData={appointmentsData}
        isVet={isVet}
        navigate={navigate}
        setAlert={setAlert}
        setResponseOk={setResponseOk}
        reload={reload}
        setReload={setReload}
      />

      <Divider className="long-divider mb-4" />

      <TreatmentHistory
        appointmentsData={appointmentsData}
      />

    </div>
  );
}

export default PetProfile; 