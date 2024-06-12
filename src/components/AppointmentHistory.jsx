import { peticionDELETE } from "../utils/ajax";
import { getReason, getDateClass } from '../utils/constants';
import { useState } from "react";
import AlertModal from "./AlertModal";
import useFetchAllVetsData from "../hooks/useFetchAllVets";
import { useAuthStore } from "../hooks/useAuthStore";
import { Pagination } from "@mui/material";

function AppointmentHistory({ isVet, navigate, appointmentsData, setAlert, setResponseOk, reload, setReload }) {
  const { setAppointmentId } = useAuthStore();

  //Recojo todos los veterinarios
  const vets = useFetchAllVetsData({ reload: true });

  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(3); // Cantidad de citas por página

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointmentsData.slice(indexOfFirstAppointment, indexOfLastAppointment);

  // Función para cambiar de página
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  //Manejar el click en añadir tratamiento
  const handleAddTreatmentClick = (appointmentId) => {
    setAppointmentId(appointmentId);
    navigate('/addtreatment');
  };

  //Manejar el modal de confirmación 
  const [basicModal, setBasicModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

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
    <div className="mb-4 mt-4">
      <AlertModal
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        toggleOpen={toggleOpen}
        title="Eliminar Cita"
        text="¿Estás seguro que deseas eliminar esta cita?"
        onConfirm={confirmDelete}
      />

      <div>
        <h2 className="title text-center">Historial de Citas</h2>
      </div>

      <div className="mt-4">
        <div>
          {
            currentAppointments.map((appointment) => (
              <div className={`custom-list-style ${getDateClass(appointment.date)}`} key={appointment.id}>
                <div className={`custom-container custom-container__reason-pill uppercase ${getReason(appointment.reason, appointment.date)} mb-2`}>
                  {appointment.reason}
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <span className="fw-bold">Fecha: {new Date(appointment.date).toLocaleDateString()}, {appointment.time}</span>
                    </div>
                    <div className="col-12 col-md-6">
                      <span className="fw-bold">Atendido por:</span>
                      {
                        vets.map((vet, index) => (
                          vet.id === appointment.veterinarianId && <span key={index}> {vet.name}</span>
                        ))
                      }
                    </div>

                    {
                      appointment.treatments.length !== 0
                      && (

                        <div className="col-12">
                          <span className="fw-bold">Tratamientos:</span>

                          {
                            appointment.treatments.map((treatment, index) => (
                              <span key={index}> {treatment.name}{index !== appointment.treatments.length - 1 ? ', ' : ''}</span>
                            ))
                          }

                        </div>
                      )
                    }
                  </div>

                </div>

                <div className="custom-container custom-container__button mt-3">
                  {
                    isVet && (

                      <button
                        type="button"
                        onClick={() => handleAddTreatmentClick(appointment.id)}
                        className="custom-btn custom-btn__clear">
                        Añadir Tratamiento
                      </button>

                    )
                  }
                  {
                    appointment.date >= new Date().toISOString() && (
                      <button
                        type="button"
                        onClick={() => handleDelete(appointment.id)}
                        className="custom-btn custom-btn__soft mt-2 mt-md-0">
                        Eliminar Cita
                      </button>
                    )
                  }
                </div>

              </div>
            ))
          }
        </div>


        {appointmentsData.length > appointmentsPerPage &&
          <div className="custom-container custom-container__center mt-3 mb-4">
            <Pagination
              count={Math.ceil(appointmentsData.length / appointmentsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              className="pagination"
              siblingCount={2}
            />
          </div>
        }
      </div>
    </div>
  );
}

export default AppointmentHistory; 