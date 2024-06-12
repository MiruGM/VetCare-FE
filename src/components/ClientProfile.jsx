import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import { useNavigate } from "react-router-dom";

import { peticionGET, peticionPUTJSON } from '../utils/ajax';
import { getButtonClass } from '../utils/constants';

import { Box, Grid, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { isValidEmail, isValidPassword, isValidPhone } from '../utils/validators';
import AlertMessage from './AlertMessage';
import CustomTextField from './CustomTextField';


function ClientProfile() {
  const navigate = useNavigate();
  const { isVet, clientId, setPetId } = useAuthStore();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [editable, setEditable] = useState(false);
  const [validFetch, setValidFetch] = useState(null);
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

    async function fetchClientData() {
      let params = new FormData();
      params.append('client', "true");

      let response = await peticionGET('clients/' + clientId, params);

      if (response.ok) {
        const data = response.data;
        setClientData(data);
      }
    }

    fetchClientData();
  }, [clientId]);

  //Validaciones
  const validationObj = {
    email: true,
    phone: true,
    password: true
  }
  const [isFieldsValid, setIsFieldsValid] = useState(validationObj);

  function validation(data) {
    let valid = true;
    let errors = { ...validationObj };
    let email = data.email.trim();
    let password = data.password.trim();
    let phone = data.phone.trim();

    //Validar email
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

    //Validar la contraseña
    if (!isValidPassword(password)) {
      valid = false;
      errors = {
        ...errors,
        password: false
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEdit = () => {
    setEditable(!editable);
  };

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
      let obj = {
        dni: clientData.dni,
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        password: clientData.password
      }

      let response = await peticionPUTJSON('clients/' + clientId, obj);

      if (response.ok) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setValidFetch(true);
        const data = response.data;
        setClientData(data);
        setEditable(false);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setValidFetch(false);
      }


    }

  };

  return (
    <div className="custom-container custom-container__md-main p-4 mb-4">
      <AlertMessage
        validFetch={validFetch}
        errorMessage="Error al actulizar los datos. Intentelo de nuevo."
        successMessage="Datos actualizados correctamente." />

      <div className="mb-4">
        <div>
          {
            isVet
              ? (
                <h2 className="title text-center" >Datos del Cliente</h2>)
              : (
                <h2 className="title text-center" >Mis datos</h2>
              )}
        </div>

        <div>

          <Box component="form" onSubmit={handleSubmit} sx={{ padding: 1, display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <CustomTextField
                  required
                  disabled
                  fullWidth
                  id="id"
                  label="ID"
                  name="id"
                  type="number"
                  value={clientData.id}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomTextField
                  required
                  disabled
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
                <CustomTextField
                  required
                  disabled
                  fullWidth
                  id="dni"
                  label="DNI"
                  name="dni"
                  type="text"
                  value={clientData.dni}
                  onChange={handleChange}
                  inputProps={{ maxLength: 9 }}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomTextField
                  required
                  disabled={!editable}
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  type="text"
                  value={clientData.email}
                  onChange={handleChange}
                  error={!isFieldsValid.email}
                  helperText={!isFieldsValid.email && 'Compruebe el formato. Ejemplo: usuario@dominio.com'}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomTextField
                  required
                  disabled={!editable}
                  fullWidth
                  id="phone"
                  label="Teléfono"
                  name="phone"
                  type="text"
                  inputProps={{ maxLength: 9 }}
                  value={clientData.phone}
                  onChange={handleChange}
                  error={!isFieldsValid.phone}
                  helperText={!isFieldsValid.phone && 'Compruebe el formato. El número inicial debe ser 6, 7, 8 ó 9. Ejemplo: 666777999'}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomTextField
                  required
                  fullWidth
                  disabled={!editable}
                  id="password"
                  label="Contraseña"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  value={clientData.password}
                  onChange={handleChange}
                  error={!isFieldsValid.password}
                  helperText={!isFieldsValid.password && "Formato incorrecto. La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disabled={!editable}
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {passwordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

            </Grid>
            <div className="custom-container custom-container__button mt-3">
              <button
                type="button"
                onClick={handleEdit}
                className={`custom-btn ${getButtonClass(editable)} mb-3`}>
                {editable
                  ? 'Cancelar'
                  : 'Editar'}
              </button>

              {editable && (
                <button
                  type="submit"
                  className="custom-btn mb-3">
                  Aceptar
                </button>
              )}
            </div>

          </Box>
        </div>
      </div >

      <Divider className="long-divider mb-4" />

      <div >
        <div>
          <h2 className="title text-center">Mascotas</h2>
        </div>

        <div>
          {(clientData.pets === undefined || clientData.pets.length === 0) ? (
            <div className="d-flex justify-content-center mt-3">
              <span className="fw-bold">No hay mascotas registradas</span>
            </div>
          ) : (

            clientData.pets.map(pet =>
              <Link key={pet.id} to={`/petprofile`} onClick={() => { setPetId(pet.id) }}>
                <div className="container custom-list-style custom-list-style__clickable">
                  <div className="row">
                    <div className="col-12">
                      <h5 className="overTitle text-center">{pet.name}</h5>
                      <p className="small-text text-center">({pet.registrationNumber})</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 col-lg-3">
                      <span className="fw-bold">{pet.type}</span>
                    </div>
                    <div className="col-6 col-lg-3">
                      <span className="fw-bold">{new Date(pet.birthDate).toLocaleDateString()}</span>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                      <span className="fw-bold">Especie: </span>{pet.species}
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                      <span className="fw-bold">Raza:</span> {pet.breed}
                    </div>
                  </div>


                </div>
              </Link>
            )
          )}


          {
            isVet && (
              <div className="custom-container custom-container__button">
                <button
                  type="button"
                  className="custom-btn mt-2"
                  onClick={() => { navigate('/addpet') }}>
                  Añadir Mascota
                </button>
              </div>
            )
          }

        </div>
      </div>

    </div >
  );
}

export default ClientProfile; 