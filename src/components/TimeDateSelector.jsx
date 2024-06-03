import useFetchAppointmentsByDateData from "../hooks/useFetchAppointmentsByDate";
import { MenuItem, Select } from "@mui/material";

function TimeDateSelector({ appointmentData, setAppointmentData, handleBtnClick }) {
  const availableHours = useFetchAppointmentsByDateData({ appointmentData });

  // Siempre se mostrarán los siquientesn días. Al clicar se mostrarán las horas disponibles. 
  //Calcular la fecha +1 día
  let dates = [];
  let now = new Date();
  now.setDate(now.getDate() + 1);
  // Llena el array con los próximos 16 días
  for (let i = 0; i < 16; i++) {
    //En este if quito los sábados y domingos
    if (!now.toDateString().includes('Sun') && !now.toDateString().includes('Sat')) {
      dates.push(now.toLocaleDateString() + ' ' + now.toISOString().split('T')[0]);
      now.setDate((now.getDate() + 1));
    } else {
      now.setDate((now.getDate() + 1));
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointmentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  return (
    <div>
      <div>
        <h2 className="title text-center" >Datos de la Cita</h2>
      </div>

      <div>
        <h6 className="fw-bold">Motivo de la cita: </h6>
        <Select
          required
          fullWidth
          id="reason"
          name="reason"
          labelId="reason-label"
          value={appointmentData.reason}
          onChange={handleChange}
        >
          <MenuItem value={'Revisión'}>Revisión</MenuItem>
          <MenuItem value={'Cirugía'}>Cirugía</MenuItem>
          <MenuItem value={'Vacunación'}>Vacunación</MenuItem>
          <MenuItem value={'Cura'}>Cura</MenuItem>
          <MenuItem value={'Muestras'}>Muestras</MenuItem>

        </Select>

        <h6 className="fw-bold mt-3">Día:</h6>
        <div className="conainter">
          <div className="row">
            {
              dates.map((date) => {
                return (
                  <div key={date} className="col-6 col-sm-4">
                    <span
                      className={appointmentData.date === date.split(" ")[1]
                        ? "d-block col-12 fw-bold text-center custom-chip custom-chip__selected"
                        : " d-block col-12 fw-bold text-center custom-chip "}
                      onClick={() => handleBtnClick('date', date)}>
                      {date.split(' ')[0]}
                    </span>
                  </div>

                )
              })
            }
          </div>

        </div>
        <div>
          {
            appointmentData.date !== ''
            && (availableHours.length === 0
              ? (
                <div className="d-flex justify-content-center mt-3">
                  <span className="fw-bold">No hay horas disponibles</span>
                </div>)
              : (
                <div>
                  <h6 className="fw-bold mt-4">Hora: </h6>
                  <div className="container">
                    <div className="row">
                      {
                        availableHours.map((hour) => {
                          return (
                            <div key={hour}
                              className="col-6 col-sm-4"
                            >
                              <div
                                className={appointmentData.time === hour
                                  ? "custom-chip custom-chip__selected"
                                  : "custom-chip"
                                }
                                onClick={() => setAppointmentData((prevState) => ({
                                  ...prevState,
                                  time: hour
                                }))}>
                                <span className="d-block text-center fw-bold">{hour.slice(0, -3)}</span>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  );
}

export default TimeDateSelector; 