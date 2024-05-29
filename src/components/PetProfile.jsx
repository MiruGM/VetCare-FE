import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { peticionGET } from '../utils/ajax';
import { useAuthStore } from '../hooks/useAuthStore';
import { useNavigate } from "react-router-dom";

import AppointmentHistory from './AppointmentHistory';
import TreatmentHistory from './TreatmentHistory';

import { Divider } from '@mui/material';



function PetProfile() {
  const navigate = useNavigate();

  const { petId } = useParams();
  const { clientId, isVet } = useAuthStore();
  const [clientName, setClientName] = useState('');
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [petData, setPetData] = useState({
    id: '',
    chipNumber: '',
    name: '',
    birthDate: '',
    type: '',
    species: '',
    breed: '',
    clientId: '',
  });

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

    async function fetchClientData() {
      let params = new FormData();
      params.append("clientId", "true");

      let response = await peticionGET('clients/' + clientId, params);

      if (response.ok) {
        setClientName(response.data.name);
      }
    }

    async function fetchAppointmentData() {
      let params = new FormData();
      params.append("appointmentID", "true");

      let response = await peticionGET('appointments/pet/' + petId, params);

      if (response.ok) {
        setAppointmentsData(response.data);
      }
    }

    fetchClientData();
    fetchPetData();
    fetchAppointmentData();
  }, [petId, clientId]);



  return (
    <div className="custom-container custom-container__md-main pt-4 px-4">

      <div className="mb-4 ">
        <div>
          <h2 className="title text-center">{petData.name}</h2>
        </div>
        <div >
          <p>Dueño: {clientName}</p>
          <p>Número de chip: {petData.registrationNumber}</p>
          <p>Fecha de nacimiento: {petData.birthDate}</p>
          <span>Tipo: {petData.type}  </span>
          <span>Especie:  {petData.species} </span>
          <span >Raza: {petData.breed}</span>
        </div>
      </div>

      <Divider className="long-divider mb-4" />

      <AppointmentHistory
        appointmentsData={appointmentsData}
        isVet={isVet}
        navigate={navigate}
      />

      <Divider className="long-divider mb-4" />

      <TreatmentHistory
        appointmentsData={appointmentsData}
      />

    </div>
  );
}

export default PetProfile; 