import { useState } from "react";

import { Pagination } from "@mui/material";

function TreatmentHistory({ appointmentsData }) {

  //Saco la información para poder hacer la paginación:
  const formattedTreatments = [];

  appointmentsData.forEach(appointment => {
    appointment.treatments.forEach(treatment => {
      const formattedAppointment = {
        id: appointment.id,
        date: appointment.date,
        treatment: treatment
      };
      formattedTreatments.push(formattedAppointment);
    });
  });
  console.log(formattedTreatments);
  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [treatmentsPerPage] = useState(1); // Cantidad de citas por página

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
    <div className="">
      <button className="custom-btn custom-btn__no-button" onClick={handleOpenContainerClick} >
        {
          openContainer ? (<>Cerrar Tratamientos</>) : (<>Mostrar Tratamientos</>)
        }

      </button>

      {
        openContainer
        && (

          <div>
            <div>
              <h2 className="text-center title mt-3">Historial de Tratamientos</h2>
            </div>
            <div>
              {
                currentTreatments.map((dateAndTreatment) => (
                  <div key={dateAndTreatment.id}>

                    {
                      (dateAndTreatment.treatment !== null | undefined) && (
                        <div >

                          <div className="border m-1 p-2" key={dateAndTreatment.treatment.id}>
                            <span>Fecha de aplicación del tratamiento: {dateAndTreatment.date}</span><br /><br />

                            <span >Tipo de Tratamiento: {dateAndTreatment.treatment.reason}</span><br />
                            <span >Nombre: {dateAndTreatment.treatment.name}</span><br />
                            <span >Descripción: {dateAndTreatment.treatment.description}</span><br />
                            <span >Duración de la intervención: {dateAndTreatment.treatment.duration}</span><br />
                            <span >Frecuencia del tratamiento: {dateAndTreatment.treatment.reason}</span><br />
                            <span >Medicación: {dateAndTreatment.treatment.meds}</span><br />
                            <span >Necesidad de seguimiento: {dateAndTreatment.treatment.reason}</span><br />
                            <span >Precio: {dateAndTreatment.treatment.price}</span><br />
                          </div>

                        </div>
                      )
                    }
                  </div>
                ))
              }
            </div>

            {formattedTreatments.length > treatmentsPerPage &&
              <div className="container-center">
                <Pagination
                  count={Math.ceil(formattedTreatments.length / treatmentsPerPage)}
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


        )
      }

      {/* </div> */}

    </div>
  );

}

export default TreatmentHistory; 