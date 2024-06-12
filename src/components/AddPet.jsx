import { useState } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
import useFetchClientByIdData from '../hooks/useFetchClientById';
import { isValidRegistrationNumberPet } from '../utils/validators';
import { useNavigate } from "react-router-dom";

import { peticionPOSTJSON } from '../utils/ajax';

import { TextField, Box, Grid, Select, MenuItem, Divider } from '@mui/material';
import BasicDatePicker from './Datepicker';
import { format } from 'date-fns';
import AlertMessage from './AlertMessage';


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

  //Validaciones
  const validationObj = {
    registrationNumber: true,
  }
  const [isFieldsValid, setIsFieldsValid] = useState(validationObj);

  function validation(data) {
    let valid = true;
    let errors = { ...validationObj };
    let registrationNumber = data.registrationNumber.trim();

    //Validar número de colegiado
    if (!isValidRegistrationNumberPet(registrationNumber)) {
      valid = false;
      errors = {
        ...errors,
        registrationNumber: false
      }
    }

    //Validación final 
    if (!valid) {
      setIsFieldsValid(errors);
    } else {
      setIsFieldsValid(validationObj);
    }

    return valid;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPetData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleDateChange = (value) => {
    setDatepickerValue(value);
    //Formatear la fecha para la bd
    const formattedDate = format(datepickerValue, 'yyyy-MM-dd');
    //Setear la fecha 
    setPetData(prevState => ({
      ...prevState,
      birthDate: formattedDate
    }));

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validation(petData)) {
      let response = await peticionPOSTJSON('pets', petData);

      if (response.ok) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setValidFetch(false);
      }
    }

  };
  console.log(petData);
  return (
    <div className="custom-container custom-container__md-main pt-4 px-4 pb-3">

      <AlertMessage
        validFetch={validFetch}
        errorMessage="Error al crear la mascota. Intentelo de nuevo."
        successMessage="Mascota creada correctamente." />

      <div>
        <h2 className="title text-center">Añadir Mascota a {clientData.name.split(' ')[0]} {clientData.name.split(' ')[1]}</h2>
      </div>

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
              error={!isFieldsValid.registrationNumber}
              helperText={!isFieldsValid.registrationNumber && 'Compruebe el formato del correo'}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* //TODO: Cambiar el datepicker por un input de tipo date */}
            <BasicDatePicker
              datepickerValue={datepickerValue}
              handleDateChange={handleDateChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select
              required
              fullWidth
              id="sex"
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