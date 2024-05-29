import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';

import { useNavigate } from "react-router-dom";

import { peticionGET, peticionPUTJSON } from '../utils/ajax';

import { Box, Grid, TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Divider from '@mui/material/Divider';

//TODO: ARREGLAR LA PETICIÓN UPDATE/EDIT DEL CLIENTE
//TODO: Arreglar la edición del pérfil -> da error en el servidor.
//TODO: hacer la validación de los datos del formulario. 
//TODO: ARREGLAR LOS ESTILOS DEL BOTÓN CANCELAR

function ClientProfile() {
  const navigate = useNavigate();
  const { isVet, clientId } = useAuthStore();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [editable, setEditable] = useState(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    async function updateData() {
      console.log(clientData.dni, clientData.name, clientData.email, clientData.phone, clientData.password)

      let obj = new FormData();
      obj.append('dni', clientData.dni);
      obj.append('name', clientData.name);
      obj.append('email', clientData.email);
      obj.append('phone', clientData.phone);
      obj.append('password', clientData.password);

      // console.log('dni:', obj.get('dni'));
      // console.log('name:', obj.get('name'));
      // console.log('email:', obj.get('email'));
      // console.log('phone:', obj.get('phone'));
      // console.log('password:', obj.get('password'));

      let response = await peticionPUTJSON('clients/' + clientId, obj);

      if (response.ok) {
        const data = response.data;
        setClientData(data);
      }
    }
    updateData();
    setEditable(false);
  };

  return (
    <div className="custom-container custom-container__md-main pt-4 px-4">

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

        <div className="">

          <Box component="form" onSubmit={handleSubmit} sx={{ padding: 1, display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  disabled
                  fullWidth
                  id="id"
                  label="ID"
                  name="id"
                  type="number"
                  value={clientData.id}
                  onChange={handleChange}
                // error={!isFieldsValid.email}
                // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  disabled
                  fullWidth
                  id="name"
                  label="Nombre"
                  name="name"
                  type="text"
                  value={clientData.name}
                  onChange={handleChange}
                // error={!isFieldsValid.email}
                // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
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
                // error={!isFieldsValid.email}
                // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  disabled={!editable}
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  type="text"
                  value={clientData.email}
                  onChange={handleChange}
                // error={!isFieldsValid.email}
                // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  disabled={!editable}
                  fullWidth
                  id="phone"
                  label="Teléfono"
                  name="phone"
                  type="text"
                  value={clientData.phone}
                  onChange={handleChange}
                // error={!isFieldsValid.email}
                // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  disabled={!editable}
                  id="password"
                  label="Contraseña"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  value={clientData.password}
                  onChange={handleChange}
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
                className="custom-btn mb-3">
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

      <div className="">
        <div>
          <h2 className="title text-center">Mascotas</h2>
        </div>

        <div className="">
          {clientData.pets.length === 0 ? (
            <p>No hay mascotas registradas</p>
          ) : (

            clientData.pets.map(pet =>
              <Link key={pet.id} to={`/petprofile/${pet.id}`}>
                <div className="custom-list-style custom-list-style__clickable d-grid">
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
                      <span className="fw-bold">{pet.birthDate}</span>
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

          <div className="custom-container custom-container__button mb-5">
            {
              isVet && (
                <button
                  type="button"
                  className="custom-btn mt-2 mb-3"
                  onClick={() => { navigate('/addpet') }}>
                  Añadir Mascota
                </button>
              )
            }
          </div>
        </div>
      </div>

    </div >
  );
}

export default ClientProfile; 