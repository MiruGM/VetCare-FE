import { useState, useEffect, useMemo } from "react";
import { useAuthStore } from '../hooks/useAuthStore';
import { useNavigate } from "react-router-dom";
import { peticionGET, peticionPOSTJSON } from "../utils/ajax";

import { Chip, Divider, MenuItem, Select } from "@mui/material";

function AddAppointment() {
  const navigate = useNavigate();
  const { clientId } = useAuthStore();

  const [specialty, setSpecialty] = useState('domestico');
  const [veterinarians, setVeterinarians] = useState([]);

  const defaultHours = useMemo(() => {
    return [
      '09:00:00',
      '09:30:00',
      '10:00:00',
      '10:30:00',
      '11:00:00',
      '11:30:00',
      '12:00:00',
      '12:30:00',
      '13:00:00',
      '13:30:00',
      '17:00:00',
      '17:30:00',
      '18:00:00',
      '18:30:00',
      '19:00:00',
      '19:30:00',
      '20:00:00',
      '20:30:00'];
  }, []);
  const [availableHours, setAvailableHours] = useState([]);

  //Información de la nueva cita
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    reason: 'Revisión',
    petId: 0,
    veterinarianId: 0
  });

  //Información para mostrar los datos del cliente
  const [clientData, setClientData] = useState({
    id: '',
    name: '',
    email: '',
    dni: '',
    phone: '',
    password: '',
    pets: [],
  });

  // Siempre se mostrarán los siquientes 14 días. Al clicar se mostrarán las horas disponibles. 
  //Calcular la fecha +2 días
  let dates = [];
  let now = new Date();
  now.setDate(now.getDate() + 1);
  // Llena el array con los próximos 15 días
  for (let i = 0; i < 15; i++) {
    dates.push(now.toLocaleDateString() + ' ' + now.toISOString().split('T')[0]);
    now.setDate((now.getDate() + 1));
  }

  // Recoger la información del cliente
  useEffect(() => {

    async function fetchData() {
      let params = new FormData();
      params.append('client', "true");

      let response = await peticionGET('clients/' + clientId, params);

      if (response.ok) {
        const data = response.data;
        setClientData(data);
      }
    }

    fetchData();

  }, [clientId]);

  //Recoger los veterinarios de la especialidad seleccionada
  useEffect(() => {

    async function fetchVetData() {
      let params = new FormData();

      let response = await peticionGET('veterinarians/speciality/' + specialty, params);

      if (response.ok) {
        const data = response.data;
        setVeterinarians(data);
      } else {
        setVeterinarians([]);
      }
    }

    fetchVetData();

  }, [specialty]);

  //Recoger las horas de las citas ya alojadas en las base de datos
  useEffect(() => {

    async function fetchAppByDateData() {
      let params = new FormData();
      let response = await peticionGET('appointments/date/' + appointmentData.date, params);

      if (response.ok) {
        const data = response.data;
        const unavailableHours = data.map((appointment) => appointment.time);
        const availableHours = defaultHours.filter(hour => !unavailableHours.includes(hour));
        setAvailableHours(availableHours);
      } else {
        setAvailableHours(defaultHours);
      }
    }
    fetchAppByDateData();
  }, [appointmentData.date, defaultHours]);

  const handleBtnClick = (name, value) => {
    if (name === 'date') {
      value = value.split(' ')[1];
    }
    setAppointmentData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointmentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await peticionPOSTJSON('appointments', appointmentData);

    alert(response.message);

    if (response.ok) {
      navigate("/petprofile/" + appointmentData.petId);
    }
  };


  return (
    <div className="container-sm custom-center-container-md">
      <div>
      </div>
      <div className="mb-4 mt-4">
        <div className="container-center">
          <h3 >Datos de {clientData.name.split(' ')[0]} {clientData.name.split(' ')[1]}</h3>
        </div>

        <div className="p-3 add-border">
          <p>Nombre: {clientData.name}</p>
          <p>DNI: {clientData.dni}</p>
          <p>Correo Electrónico: {clientData.email}</p>
          <p>Teléfono: {clientData.phone}</p>
          <label>Elige la mascota: </label>
          <div>
            {
              clientData.pets.map((pet) => {
                return <Chip key={pet.id}
                  className="m-1"
                  label={pet.name}
                  clickable
                  color={appointmentData.petId === pet.id ? 'primary' : 'default'}
                  onClick={() => handleBtnClick('petId', pet.id)}
                />
              })
            }
          </div>
        </div>
      </div>

      <Divider sx={{ display: { xs: 'block', sm: 'none' }, height: 1, bgcolor: 'grey' }} />

      <div className="mb-4 mt-4">
        <div className="container-center">
          <h3 >Datos del Veterinario</h3>
        </div>

        <div className="p-3 add-border">
          <label>Elige la especialidad: </label>
          <Select
            required
            fullWidth
            displayEmpty
            id="speciality"
            name="speciality"
            labelId="speciality-label"
            // label="Especialidad"
            value={specialty}
            onChange={(e) => { setSpecialty(e.target.value); }}
          >
            <MenuItem value="domestico">Vet. Doméstico</MenuItem>
            <MenuItem value="exotico">Vet. Animales Exóticos</MenuItem>
            <MenuItem value="aves">Vet. Aves</MenuItem>

          </Select>

          <div>

            {
              veterinarians.length === 0
                ? <div>
                  <p>No hay veterinarios disponibles
                  </p>
                </div>
                : <div>
                  {veterinarians.map((vet) => {
                    return <div className="border m-2" key={vet.id} onClick={() => handleBtnClick('veterinarianId', vet.id)}>
                      <p>{vet.name} ({vet.email} - {vet.registrationNumber})</p>
                    </div>
                  })}
                </div>
            }
          </div>
        </div>

      </div>

      <Divider sx={{ display: { xs: 'block', sm: 'none' }, height: 1, bgcolor: 'grey' }} />

      <div className="mb-4 mt-4">
        <div className="container-center">
          <h3 >Datos de la Cita</h3>
        </div>

        <div className="p-3 add-border">
          <label>Motivo de la cita: </label>
          <Select
            required
            fullWidth
            id="reason"
            name="reason"
            labelId="reason-label"
            // label="Motivo"
            value={appointmentData.reason}
            onChange={handleChange}
          >
            <MenuItem value={'Revisión'}>Revisión</MenuItem>
            <MenuItem value={'Cirugía'}>Cirugía</MenuItem>
            <MenuItem value={'Vacunación'}>Vacunación</MenuItem>
            <MenuItem value={'Cura'}>Cura</MenuItem>
            <MenuItem value={'Muestras'}>Muestras</MenuItem>

          </Select>

          <label>Día: </label>
          <div>
            {
              dates.map((date) => {
                return <Chip key={date}
                  className="m-1 p-2"
                  label={date.split(' ')[0]}
                  clickable
                  color={appointmentData.date === date.split(' ')[1] ? 'primary' : 'default'}
                  onClick={() => handleBtnClick('date', date)}

                />
              })
            }
          </div>
          <div>
            {
              appointmentData.date !== ''
              && (
                availableHours.length === 0 ? (<p>No hay horas disponibles</p>)
                  : (
                    <div>
                      <label>Hora: </label>
                      <div>
                        {
                          availableHours.map((hour) => {
                            return <Chip key={hour}
                              className="m-1 p-2"
                              label={hour}
                              clickable
                              color={appointmentData.time === hour ? 'primary' : 'default'}
                              onClick={() => setAppointmentData((prevState) => ({
                                ...prevState,
                                time: hour
                              }))}
                            />
                          })
                        }
                      </div>
                    </div>)
              )
            }

          </div>
        </div>
      </div>
      <div className="custom-button-display mb-4">
        <button
          type="submit"
          className="btn btn-primary mt-3 custom-button"
          onClick={handleSubmit}>
          Agendar Cita
        </button>
      </div>
    </div >
  );
}


export default AddAppointment;