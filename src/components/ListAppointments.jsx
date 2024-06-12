import { peticionDELETE } from "../utils/ajax";
import useFetchAllPetsData from "../hooks/useFetchAllPets";
import useFetchAllVetsData from "../hooks/useFetchAllVets";
import useFetchAllAppointmentsAfterData from "../hooks/useFetchAppointmentsByDateAfter";
import useFetchAllAppointmentsBeforeData from "../hooks/useFetchAppointmentsByDateBefore";
import AlertModal from "./AlertModal";
import { getReason } from '../utils/constants';

import { Alert, ButtonGroup, Button, Pagination } from "@mui/material";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


function ListAppointments() {
  const pets = useFetchAllPetsData();
  const vets = useFetchAllVetsData({ reload: true });
  const [selectedOption, setSelectedOption] = useState('option1');

  //Regular las fechas que se muestran
  let now = new Date();
  let currentDate = now.toISOString().split('T')[0];
  const [reload, setReload] = useState(false);

  const appointmentsAfterDate = useFetchAllAppointmentsAfterData({ reload, currentDate });
  const appointmentsBeforeDate = useFetchAllAppointmentsBeforeData({ reload, currentDate });

  const [shownAppointments, setShownAppointments] = useState([]);

  useEffect(() => {
    if (selectedOption === 'option1') {
      setShownAppointments(appointmentsAfterDate);
    } else if (selectedOption === 'option2') {
      setShownAppointments(appointmentsBeforeDate);
    }
  }, [appointmentsAfterDate, appointmentsBeforeDate, selectedOption]);

  //Manejo de botón 
  const handleButtonChange = (optionValue) => {
    setSelectedOption(optionValue);
  }

  //Filtrado de veterinarios a partir del input
  const [filterChange, setFilterChange] = useState('');

  let filterAppByVets = [];
  if (!filterChange) {

    filterAppByVets = shownAppointments;

  } else {

    filterAppByVets = shownAppointments.filter((app) => {
      let vetName = vets.find(vet => vet.id === app.veterinarianId)?.name
      return vetName.toLowerCase().includes(filterChange.toLowerCase());
    });

  }

  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(8); //Cantidad de citas por página

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filterAppByVets.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  //Manejar el modal de confirmación
  const [basicModal, setBasicModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [alert, setAlert] = useState(false);
  const [responseOk, setResponseOk] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);

  //Eliminar cita
  const handleDelete = (appointmentId) => {
    toggleOpen();
    setSelectedAppointmentId(appointmentId);
  };

  const confirmDelete = async () => {
    let response = await peticionDELETE("appointments/" + selectedAppointmentId);

    if (response.ok) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setResponseOk(true);
      toggleOpen();
      setAlert(true);
      setReload(!reload);
      setTimeout(() => {
        setAlert(false);
      }, 2000);

    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setResponseOk(false);
      toggleOpen();
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);

    }
  };

  return (
    <div className="custom-container custom-container__md-main-table py-4 px-md-4">
      <AlertModal
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        toggleOpen={toggleOpen}
        title="Eliminar Cita"
        text="¿Estás seguro que deseas eliminar esta cita?"
        onConfirm={confirmDelete}
      />

      {
        alert && (responseOk
          ? (<div className="mb-3 px-5">
            <Alert severity="success">Cita eliminada correctamente.</Alert>
          </div>)
          : (<div className="mb-3 px-5">
            <Alert severity="error">Error al eliminar la cita.</Alert>
          </div>))
      }

      <div>
        <h2 className="title text-center">Listado de Citas</h2>
      </div>

      <div className="d-block d-md-flex justify-content-center my-3 mx-5">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Busca un veterinario"
          value={filterChange}
          onChange={(e) => setFilterChange(e.target.value)} />

        <div className="d-flex justify-content-center mt-3 mt-md-0 ">
          <ButtonGroup
            variant="contained"
            aria-label="button group"
            sx={{

              fontFamily: 'M PLUS Rounded 1c',
              boxShadow: '0',

              '& .MuiButton-root': {
              },
              '& .MuiButton-contained': {
                color: '#ffffff',
                backgroundColor: '#199ebc',
                border: '2px solid #199ebc',

                '&:hover': {
                  border: '2px solid #199ebc',
                  backgroundColor: '#127389',
                },
              },
              '& .MuiButton-outlined': {
                border: '2px solid #199ebc',
                color: '#199ebc',

                '&:hover': {
                  color: '#ffffff',
                  backgroundColor: '#199ebc',
                },
              },
            }}
          >
            <Button
              onClick={() => handleButtonChange('option1')}
              variant={selectedOption === 'option1' ? 'contained' : 'outlined'}
            >
              CITAS FUTURAS
            </Button>
            <Button
              onClick={() => handleButtonChange('option2')}
              variant={selectedOption === 'option2' ? 'contained' : 'outlined'}
            >
              CITAS PASADAS
            </Button>

          </ButtonGroup>
        </div>



      </div>

      {/* Este div es para móvil => LISTA */}
      <div className="d-block d-md-none">
        <ul className="list-group list-group-flush m-3">
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
                    <button className="custom-btn custom-btn__soft" onClick={() => handleDelete(item.id)}>Eliminar</button>
                  </div>

                </div>

              </li>
            ))
          }
        </ul>
      </div>

      {/* Este div es para desktop => TABLA */}
      <div className="d-none d-md-block">
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
                  <button className="custom-btn custom-btn__soft" onClick={() => handleDelete(row.id)}><DeleteIcon /></button>
                </td>
              </tr>
            ))}

          </MDBTableBody>
        </MDBTable>
      </div>
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
  );
}

export default ListAppointments; 