import { peticionPOSTJSON } from '../utils/ajax';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { isValidDni, isValidEmail, isValidPhone } from "../utils/validators";

import { Box, Grid, TextField } from '@mui/material';
import AlertMessage from './AlertMessage';

function AddClient() {
  const navigate = useNavigate();
  const [validFetch, setValidFetch] = useState(null);
  const [clientData, setClientData] = useState({
    dni: '',
    name: '',
    email: '',
    phone: '',
    password: '123456Aa',
  });


  const validationObj = {
    dni: true,
    email: true,
    phone: true,
  }
  const [isFieldsValid, setIsFieldsValid] = useState(validationObj);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClientData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validation(clientData)) {
      let response = await peticionPOSTJSON('clients', clientData);

      if (response.ok) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setValidFetch(true);
        setClientData({
          dni: '',
          name: '',
          email: '',
          phone: '',
          password: '123456Aa'
        });
        setTimeout(() => {
          navigate("/listclients");
        }, 2000);

      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setValidFetch(false);
      }
    }
  };


  function validation(data) {
    let valid = true;
    let errors = { ...validationObj };
    let dni = data.dni.trim();
    let email = data.email.trim();
    let phone = data.phone.trim();

    //Validar DNI 
    if (!isValidDni(dni)) {
      valid = false;
      errors = {
        ...errors,
        dni: false
      }
    }

    //Validar correo
    if (!isValidEmail(email)) {
      valid = false;
      errors = {
        ...errors,
        email: false
      }
    }

    // Validar teléfono
    if (!isValidPhone(phone)) {
      valid = false;
      errors = {
        ...errors,
        phone: false
      }
    }

    console.log(errors);
    //Validación final 
    if (!valid) {
      setIsFieldsValid(errors);
    } else {
      setIsFieldsValid(validationObj);
    }

    return valid;
  }

  return (
    <div className="custom-container custom-container__md-main pt-4 px-4 pb-3">

      <AlertMessage
        validFetch={validFetch}
        errorMessage="Error al crear el cliente. Intentelo de nuevo."
        successMessage="Cliente creado correctamente." />

      <div>
        <h2 className="title text-center">Alta de Cliente</h2>
      </div>

      <div className="mx-md-5">
        <Box component="form" name="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                type="text"
                value={clientData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="dni"
                label="DNI"
                name="dni"
                type="text"
                inputProps={{ maxLength: 9 }}
                value={clientData.dni}
                onChange={handleChange}
                error={!isFieldsValid.dni}
                helperText={!isFieldsValid.dni && 'Compruebe el formato. Ejemplo: 12345678A'}
              />
            </Grid>



            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                type="text"
                value={clientData.email}
                onChange={handleChange}
                error={!isFieldsValid.email}
                helperText={!isFieldsValid.email && 'Compruebe el formato del correo. Ejemplo usuario@dominio.com'}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Teléfono"
                name="phone"
                type="text"
                inputProps={{ maxLength: 9 }}
                value={clientData.phone}
                onChange={handleChange}
                error={!isFieldsValid.phone}
                helperText={!isFieldsValid.phone && 'Compruebe el formato del teléfono. Ejemplo: 666777999'}
              />
            </Grid>
          </Grid>

          <div className="custom-container custom-container__button">
            <button
              type="button"
              className="custom-btn mt-3"
              onClick={handleSubmit}>
              Aceptar
            </button>
          </div>
        </Box>
      </div>

    </div>
  );
}

export default AddClient; 