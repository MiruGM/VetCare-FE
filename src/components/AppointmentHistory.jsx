import { useState } from "react";

import { Pagination } from "@mui/material";

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
                <span>Motivo de la Cita: {appointment.reason}  </span>
                <span>Fecha: {appointment.date}, {appointment.time}</span><br />
                <span>Atentido por: {appointment.veterinarianId}</span>
                <p>

                </p>
                {
                  appointment.treatments.length !== 0
                  && (

                    <div >
                      <p>Tratamientos:
                        {
                          appointment.treatments.map((treatment) => (
                            <span key={treatment.id}> {treatment.name},</span>
                          ))
                        }
                      </p>
                    </div>
                  )
                }
                {
                  isVet && (
                    <div className="custom-container custom-container__button">
                      <button
                        type="button"
                        onClick={() => { navigate('/addtreatment/' + appointment.id) }}
                        className="custom-btn custom-btn__clear">
                        Añadir Tratamiento
                      </button>
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>


        {appointmentsData.length > appointmentsPerPage &&
          <div className="container-center">
            <Pagination
              count={Math.ceil(appointmentsData.length / appointmentsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              // color="primary"
              // size="small"
              // shape="rounded"
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