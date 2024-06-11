import { useState } from "react";
import { getReason } from '../utils/constants';

import { Pagination } from "@mui/material";

function TreatmentHistory({ appointmentsData }) {

  //Saco la información para poder hacer la paginación:
  const formattedTreatments = [];

  appointmentsData.forEach(appointment => {
    appointment.treatments.forEach((treatment, index) => {
      const formattedAppointment = {
        id: `${appointment.id}-${index}`,
        appointmentId: appointment.id,
        date: appointment.date,
        treatment: treatment
      };
      formattedTreatments.push(formattedAppointment);
    });
  });

  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [treatmentsPerPage] = useState(4); // Cantidad de citas por página

  const indexOfLastTreatment = currentPage * treatmentsPerPage;
  const indexOfFirstTreatment = indexOfLastTreatment - treatmentsPerPage;
  const currentTreatments = formattedTreatments.slice(indexOfFirstTreatment, indexOfLastTreatment);

  // Función para cambiar de página
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  //Abrir y cerrar el contenedor
  const [openContainer, setOpenContainer] = useState(false);

  const handleOpenContainerClick = () => {
    setOpenContainer(!openContainer);
  };

  return (
    <div className="d-flex flex-column">

      <button className="custom-btn custom-btn__no-button mb-3" onClick={handleOpenContainerClick} >
        {
          openContainer ? (<>Cerrar Tratamientos</>) : (<>Mostrar Tratamientos</>)
        }

      </button>

      {
        openContainer
        && (

          <div>

            <div>
              <h2 className="text-center title mt-2">Historial de Tratamientos</h2>
            </div>

            <div className="my-3">
              {
                currentTreatments.map((dateAndTreatment) => (
                  <div className="custom-list-style" key={dateAndTreatment.id}>
                    {
                      (dateAndTreatment.treatment !== null | undefined) && (
                        <div className="container p-1" key={dateAndTreatment.treatment.id}>
                          <div className="row">
                            <div className={`col-6 custom-container custom-container__reason-pill uppercase ${getReason(dateAndTreatment.treatment.reason)}`}>
                              <span>{dateAndTreatment.treatment.reason}</span>
                            </div>
                            <div className="col-6">
                              <div className="custom-container custom-container__reason-pill">
                                <span className="fw-bold">{new Date(dateAndTreatment.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col-12">
                              <span className="overTitle">{dateAndTreatment.treatment.name}</span>

                            </div>
                            <div className="col-12 mt-2">
                              <span >{dateAndTreatment.treatment.description}</span><br />
                            </div>

                            <div className="col-12 col-lg-6 mt-3">
                              <span className="d-block fw-bold">Duración de la intervención:</span>
                              <span className="d-block">{dateAndTreatment.treatment.duration}</span>
                            </div>

                            <div className="col-12 col-lg-6 mt-2">
                              <span className="d-block fw-bold">Frecuencia del tratamiento:</span>
                              <span className="d-block">{dateAndTreatment.treatment.frequency}</span>
                            </div>

                            <div className="col-12 col-lg-6 mt-2">
                              <span className="d-block fw-bold">Medicación:</span>
                              <span className="d-block">{dateAndTreatment.treatment.meds}</span>
                            </div>


                            <div className="col-12 col-lg-6 mt-2">
                              <span className="fw-bold">Seguimiento:</span> {dateAndTreatment.treatment.followUp ? 'Sí' : 'No'}
                            </div>

                            <div className="col-12 mt-2">
                              <div className="custom-container custom-container__reason-pill custom-container__reason-pill__small-right">
                                <span className="fw-bold">{dateAndTreatment.treatment.price}€</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      )
                    }
                  </div>
                ))
              }
            </div>

            {formattedTreatments.length > treatmentsPerPage &&
              <div className="custom-container custom-container__center mb-2">
                <Pagination
                  count={Math.ceil(formattedTreatments.length / treatmentsPerPage)}
                  page={currentPage}
                  onChange={handleChangePage}

                />
              </div>
            }

          </div>


        )
      }

      {/* </div> */}

    </div>
  );

}

export default TreatmentHistory; 