import { useEffect, useState } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
import { useNavigate } from "react-router-dom";

import { peticionGET, peticionPOSTJSON } from '../utils/ajax';

import { TextField, Box, Grid, Select, MenuItem } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Divider from '@mui/material/Divider';
import esLocale from "date-fns/locale/es";

//TODO: Cambiar el alert por mun modal
//TODO: VALIDACIÓN DE DATOS
//TODO: ARREGLAR/CAMBIAR EL DATEPICKER => error en la elección de la primera fecha

function AddPet() {
  const navigate = useNavigate();
  const { clientId } = useAuthStore();
  const [pickedDate, setPickedDate] = useState(null);


  const [petData, setPetData] = useState({
    registrationNumber: '',
    name: '',
    birthDate: '',
    sex: 'M',
    type: 'Mamífero',
    species: '',
    breed: '',
    clientId: clientId
  });

  const [clientData, setClientData] = useState({
    id: '',
    name: '',
    email: '',
    dni: '',
    phone: '',
    password: '',
    pets: [],
  });

  useEffect(() => {

    async function fetchData() {
      let params = new FormData();
      params.append('user', "true");

      let response = await peticionGET('clients/' + clientId, params);

      if (response.ok) {
        const data = response.data;
        setClientData(data);
      }
    }

    fetchData();

  }, [clientId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleDateChange = (event) => {
    //Recojo el valor de la fecha desde datepicker
    setPickedDate(event);
    console.log('Fecha recogida: ', pickedDate);
    //Formateo la fecha para que sea aceptada en el servidor: yyyy-mm-dd
    //1. Creo un objeto Date con la fecha recogida
    const date = new Date(pickedDate);
    console.log('Fecha recogida: ', date);
    //2. Rocorto con el formato deseado: 
    const formattedDate = date.toISOString().split('T')[0];
    console.log('Fecha formateada: ', formattedDate);

    //Seteo la fecha en el objeto petData
    setPetData(prevState => ({
      ...prevState,
      birthDate: formattedDate
    }));
    console.log('handleDatechange: ', petData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('Fecha recogida de datepicker:', dateValue);

    // //Recoger la fecha + 1 día para calcular correctamente la fecha de nacimiento desde Datepicker
    // const date = new Date(dateValue);
    // date.setDate(date.getDate() + 1);
    // //Formatear la fecha para que sea aceptada por el servidor
    // const dateValueFormatted = date.toISOString().split('T')[0];
    // console.log('Fecha formateada:', dateValueFormatted);
    // //Añadir la fecha al objeto petData
    // handleDateChange(dateValueFormatted);

    // console.log('Submit: ', petData);

    //Petición POST para añadir la mascota
    let response = await peticionPOSTJSON('pets', petData);

    alert(response.message);

    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <div className="custom-container custom-container__md-main pt-4 px-4 pb-3">

      <div>
        <h2 className="title text-center">Añadir Mascota a {clientData.name.split(' ')[0]} {clientData.name.split(' ')[1]}</h2>
      </div>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              type="text"
              value={petData.name}
              onChange={handleChange}
            // inputProps={{ maxLength: 50 }}
            // error={!isFieldsValid.email}
            // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
              <DatePicker
                label="Fecha de Nacimiento"
                inputFormat="dd-MM-yyyy"
                value={pickedDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: { variant: 'outlined', fullWidth: true, required: true },
                  toolbar: {
                    toolbarFormat: "dd-MM-yyyy",
                    hidden: false
                  }
                }}
                autoFocus={true}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Select
              required
              fullWidth
              id="sex"
              //label="Tipo"
              name="sex"
              value={petData.sex}
              onChange={handleChange}
            >
              <MenuItem value={'M'}>Macho</MenuItem>
              <MenuItem value={'H'}>Hembra</MenuItem>
              <MenuItem value={'X'}>Indefinido</MenuItem>

            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="registrationNumber"
              label="Número de Registro / Chip"
              name="registrationNumber"
              type="text"
              value={petData.registrationNumber}
              onChange={handleChange}
              inputProps={{ maxLength: 15 }}
            // error={!isFieldsValid.email}
            // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
            />
          </Grid>

          <Grid item xs={12} sx={{ my: 2 }}>
            <Divider sx={{ height: 1, bgcolor: 'grey' }} />
          </Grid>

          <Grid item xs={12}>
            <Select
              required
              fullWidth
              id="tipo"
              //label="Tipo"
              name="type"
              value={petData.type}
              onChange={handleChange}
            >
              <MenuItem value={'Ave'}>Ave</MenuItem>
              <MenuItem value={'Mamífero'}>Mamífero</MenuItem>
              <MenuItem value={'Reptil'}>Reptil</MenuItem>
              <MenuItem value={'Anfibio'}>Anfibio</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="species"
              label="Especie"
              name="species"
              type="text"
              value={petData.species}
              onChange={handleChange}

            // error={!isFieldsValid.email}
            // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="breed"
              label="Raza"
              name="breed"
              type="text"
              value={petData.breed}
              onChange={handleChange}

            // error={!isFieldsValid.email}
            // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
            />
          </Grid>

        </Grid>

        <div className="custom-container custom-container__button">
          <button
            type="submit"
            className="custom-btn mt-3">
            Añadir Mascota
          </button>
        </div>
      </Box>
    </div>
  );
}

export default AddPet;