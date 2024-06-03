import useFetchAllPetsData from "../hooks/useFetchAllPets";
import useFetchAllVetsData from "../hooks/useFetchAllVets";
import useFetchAllAppointments from "../hooks/useFetchAllAppointments";
import AlertModal from "./AlertModal";

import { Alert, Pagination } from "@mui/material";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { peticionDELETE } from "../utils/ajax";
//TODO: ARREGLAR EL REFRESCO DE LA PÁGINA AL ELIMINAR UNA CITA

function ListAppointments() {
  let appointments = useFetchAllAppointments();
  const pets = useFetchAllPetsData();
  const vets = useFetchAllVetsData();

  //Calcular y eliminar las citas pasadas. 
  function getDates() {

    let now = new Date();
    let currentDate = now.toISOString().split('T')[0];

    if (appointments.length > 0) {
      appointments = appointments.filter((appointment) => appointment.date >= currentDate)
    }
  }
  getDates();

  //Filtrado de veterinarios a partir del input
  const [filterChange, setFilterChange] = useState('');

  let filterAppByVets = [];
  if (!filterChange) {

    filterAppByVets = appointments;

  } else {

    filterAppByVets = appointments.filter((app) => {
      let vetName = vets.find(vet => vet.id === app.veterinarianId)?.name
      return vetName.toLowerCase().includes(filterChange.toLowerCase());
    });

  }

  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10); //Cantidad de citas por página

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filterAppByVets.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const getReason = (reason) => {
    switch (reason.toLowerCase()) {
      case 'revisión':
        return 'reason-rev';
      case 'cirugía':
        return 'reason-cir';
      case 'vacunación':
        return 'reason-vac';
      case 'cura':
        return 'reason-cur';
      case 'muestras':
        return 'reason-mue';
      default:
        return '';
    }
  };

  //Manejar el modal de confirmación
  const [basicModal, setBasicModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [alert, setAlert] = useState(false);
  const [responseOk, setResponseOk] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);

  //Eliminar cita
  const handleDelete = (appointmentId) => {
    console.log(appointmentId);
    console.log(basicModal);

    toggleOpen();
    setSelectedAppointmentId(appointmentId);

  };

  const confirmDelete = async () => {
    console.log('Eliminar cita con id: ', selectedAppointmentId);

    let response = await peticionDELETE("appointments/" + selectedAppointmentId);

    if (response.ok) {
      setResponseOk(true);
      toggleOpen();

      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);

    } else {
      setResponseOk(false);
      toggleOpen();
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);

    }


  };

  return (
    <div className="custom-container custom-container__md-main-table pt-4">
      <AlertModal
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        toggleOpen={toggleOpen}
        title="Eliminar Cita"
        text="¿Estás seguro que deseas eliminar esta cita?"
        onConfirm={confirmDelete}
      />

      <div>
        <h2 className="title text-center">Listado de Citas</h2>
      </div>

      <div className="mt-3 mx-5">
        <input
          type="text"
          className="form-control"
          placeholder="Busca un veterinario"
          value={filterChange}
          onChange={(e) => setFilterChange(e.target.value)} />

        {
          alert && (responseOk
            ? (<div className="mt-3">
              <Alert severity="success">Cita eliminada correctamente.</Alert>
            </div>)
            : (<div className="mt-3">
              <Alert severity="error">Error al eliminar la cita.</Alert>
            </div>))
        }
      </div>



      {/* Este div es para móvil => LISTA */}
      <div className="d-block d-md-none mx-3">
        <ul className="list-group list-group-flush mt-3">
          {
            currentAppointments.map((item) => (
              <li key={item.id} className="custom-list-style " >
                <div className="container p-1">
                  <div className="row">
                    <div className={`col-6 custom-container custom-container__reason-pill uppercase ${getReason(item.reason)}`}>
                      <span>{item.reason}</span>
                    </div>
                    <div className="col-6">
                      <div className="custom-container custom-container__reason-pill">
                        <span className="fw-bold">{pets.find(pet => pet.id === item.petId)?.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <h5 className="text-center fw-bold">
                      {vets.find(vet => vet.id === item.veterinarianId)?.name}
                    </h5>
                  </div>
                  <div className="row">
                    <div className="col-6 text-center">
                      <span className="fw-bold">F:</span> {new Date(item.date).toLocaleDateString()}
                    </div>
                    <div className="col-6 text-center">
                      <span className="fw-bold">H:</span> {item.time?.slice(0, -3)}
                    </div>
                  </div>

                  <div className="custom-container custom-container__button mt-3">
                    <button className="custom-btn custom-btn__clear" onClick={() => handleDelete(item.id)}>Eliminar</button>
                  </div>

                </div>

              </li>
            ))
          }
        </ul>
        {
          filterAppByVets.length > appointmentsPerPage && (
            <div className="custom-container custom-container__center mt-2 mb-4">
              <Pagination
                count={Math.ceil(filterAppByVets.length / appointmentsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
              />
            </div>
          )
        }
      </div>

      {/* Este div es para desktop => TABLA */}
      <div className="d-none d-md-block p-3 m-3">
        <MDBTable className="custom-table">
          <MDBTableHead>
            <tr>
              <th scope="col">VETERINARIO</th>
              <th scope="col">MASCOTA</th>
              <th scope="col">MOTIVO</th>
              <th scope="col">FECHA</th>
              <th scope="col">HORA</th>
              <th scope="col">ELIMINAR</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {currentAppointments.map((row) => (
              <tr key={row.id}>
                <td>{vets.find(vet => vet.id === row.veterinarianId)?.name}</td>
                <td className="text-center">{pets.find(pet => pet.id === row.petId)?.name}</td>
                <td className="text-center">
                  <div className={`custom-container custom-container__reason-pill uppercase ${getReason(row.reason)}`}>
                    {row.reason}
                  </div>
                </td>
                <td className="text-center">{new Date(row.date).toLocaleDateString()}</td>
                <td className="text-center">{row.time?.slice(0, -3)}</td>
                <td className="text-center">
                  <button className="custom-btn" onClick={() => handleDelete(row.id)}><DeleteIcon /></button>
                </td>
              </tr>
            ))}

          </MDBTableBody>
        </MDBTable>
        {
          filterAppByVets.length > appointmentsPerPage && (
            <div className="custom-container custom-container__center">
              <Pagination
                count={Math.ceil(filterAppByVets.length / appointmentsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
              />
            </div>
          )
        }
      </div>

    </div>
  );
}

export default ListAppointments; 