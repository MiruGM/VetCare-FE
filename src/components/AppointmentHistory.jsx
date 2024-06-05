//TODO: TRATAR DE PONER EL NOMBRE DEL VETERINARIO EN LA CITA

import { Pagination } from "@mui/material";
import { useState } from "react";

function AppointmentHistory({ isVet, navigate, appointmentsData }) {

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

  //Función para el estilo de la cita
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

  return (
    <div className="mb-4 mt-4">
      <div>
        <h2 className="title text-center">Historial de Citas</h2>
      </div>

      <div className="mt-4">
        <div>
          {
            currentAppointments.map((appointment) => (
              <div className="custom-list-style" key={appointment.id}>
                <div className={`custom-container custom-container__reason-pill uppercase ${getReason(appointment.reason)} mb-2`}>
                  {appointment.reason}
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <span className="fw-bold">Fecha: {new Date(appointment.date).toLocaleDateString()}, {appointment.time}</span>
                    </div>
                    <div className="col-12 col-md-6">
                      <span className="fw-bold">Atendido por:</span> {appointment.veterinarianId}
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
                        onClick={() => { navigate('/addtreatment/' + appointment.id) }}
                        className="custom-btn custom-btn__clear">
                        Añadir Tratamiento
                      </button>

                    )
                  }
                  {
                    appointment.date > new Date().toISOString() && (
                      <button
                        type="button"
                        onClick={() => { navigate('/addtreatment/' + appointment.id) }}
                        className="custom-btn custom-btn__soft mt-2 mt-md-0">
                        Borrar Cita
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