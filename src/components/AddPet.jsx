import { useState } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
import useFetchClientByIdData from '../hooks/useFetchClientById';

import { useNavigate } from "react-router-dom";

import { peticionPOSTJSON } from '../utils/ajax';

import { TextField, Box, Grid, Select, MenuItem } from '@mui/material';
import { Alert, Divider } from '@mui/material';
import BasicDatePicker from './Datepicker';
import { format } from 'date-fns';

//TODO: Cambiar el alert por un modal
//TODO: VALIDACIÓN DE DATOS
//TODO: ARREGLAR/CAMBIAR EL DATEPICKER => error en la elección de la primera fecha

function AddPet() {
  const navigate = useNavigate();
  const { clientId } = useAuthStore();
  const clientData = useFetchClientByIdData();
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
  const [validFetch, setValidFetch] = useState(null);

  const [datepickerValue, setDatepickerValue] = useState(null);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Formatear la fecha para la bd
    const formattedDate = format(datepickerValue, 'yyyy-MM-dd');
    console.log('Fecha formateada: ', formattedDate);
    setPetData(prevState => ({
      ...prevState,
      birthDate: formattedDate
    }));

    // Petición POST para añadir la mascota
    let response = await peticionPOSTJSON('pets', petData);

    if (response.ok) {
      setValidFetch(true);
      setPetData({
        registrationNumber: '',
        name: '',
        birthDate: '',
        sex: 'M',
        type: 'Mamífero',
        species: '',
        breed: '',
        clientId: clientId
      });
      setTimeout(() => {
        navigate("/clientprofile");
      }, 2000);

    } else {

      setValidFetch(false);
    }
  };

  console.log('PetData: ', petData);

  return (
    <div className="custom-container custom-container__md-main pt-4 px-4 pb-3">
      <div>
        <h2 className="title text-center">Añadir Mascota a {clientData.name.split(' ')[0]} {clientData.name.split(' ')[1]}</h2>
      </div>

      {
        validFetch === false
          ? (
            <div>
              <Alert severity="error">Error al crear la mascota. Intentelo de nuevo.</Alert>
            </div>)
          : validFetch !== null && (
            <div>
              <Alert severity="success">Mascota creada correctamente.</Alert>
            </div>)
      }

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
            <BasicDatePicker datepickerValue={datepickerValue} setDatepickerValue={setDatepickerValue} />
          </Grid>

          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sx={{ my: 2 }}>
            <Divider className="long-divider mb-4" />
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