//TODO: VALIDACIÓN DE DATOS DE FORMULARIOS

import { useEffect, useState } from 'react';
import { useAuthStore } from '../hooks/useAuthStore';
// import { useNavigate } from "react-router-dom";
import { peticionGET, peticionPUTJSON } from '../utils/ajax';
import { Box } from '@mui/system';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AlertMessage from './AlertMessage';

function VetProfile() {
  // const navigate = useNavigate();
  const { vetId } = useAuthStore();
  const [validFetch, setValidFetch] = useState(null);

  const [vetData, setVetData] = useState({
    id: '',
    registrationNumber: '',
    name: '',
    email: '',
    password: '',
    speciality: 'Doméstico',
    admin: 0
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {

    async function fetchVetData() {
      let params = new FormData();

      let response = await peticionGET("veterinarians/" + vetId, params);

      if (response.ok) {
        const data = response.data;
        setVetData(data);
      }
    }

    fetchVetData();
  }, [vetId]);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCheckChange = (event) => {
    setVetData(prevState => ({
      ...prevState,
      admin: event.target.checked ? 1 : 0
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVetData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    async function updateDate() {
      let obj = {
        registrationNumber: vetData.registrationNumber,
        name: vetData.name,
        email: vetData.email,
        password: vetData.password,
        speciality: vetData.speciality,
        admin: vetData.admin
      };

      let response = await peticionPUTJSON('veterinarians/' + vetId, obj);

      if (response.ok) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setValidFetch(true);
        const data = response.data;
        setVetData(data);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setValidFetch(false);
      }
    }

    updateDate();
  }


  return (
    <div className="custom-container custom-container__md-main pt-4 px-4">

      <AlertMessage
        validFetch={validFetch}
        errorMessage="Error al actualizar los datos. Intentelo de nuevo."
        successMessage="Datos actualizados correctamente." />

      <div className="mb-4">
        <div>
          <h2 className="title text-center">Datos del Veterinario</h2>
        </div>
      </div>

      <div>
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
                value={vetData.id}
                onChange={handleChange}
              // error={!isFieldsValid.email}
              // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                type="text"
                value={vetData.name}
                onChange={handleChange}
              // error={!isFieldsValid.email}
              // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
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
                value={vetData.email}
                onChange={handleChange}
              // error={!isFieldsValid.email}
              // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Contraseña"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                value={vetData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
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

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="registrationNumber"
                label="Número de Colegiatura"
                name="registrationNumber"
                type="text"
                value={vetData.registrationNumber}
                onChange={handleChange}
              // error={!isFieldsValid.email}
              // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                required
                fullWidth
                id="speciality"
                name="speciality"
                labelId="speciality"
                value={vetData.speciality}
                onChange={handleChange}
              >
                <MenuItem value={'Doméstico'}>Vet. Doméstico</MenuItem>
                <MenuItem value={'Exóticos'}>Vet. Animales Exóticos</MenuItem>
                <MenuItem value={'Aves'}>Vet. Aves</MenuItem>


              </Select>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                  checked={vetData.admin}
                  onChange={handleCheckChange}
                />}
                label="Rol de administrador"
                labelPlacement="end"
              />
            </Grid>

          </Grid>

          <div className="custom-container custom-container__button my-3">
            <button
              type="submit"
              className="custom-btn">
              Guardar Cambios
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
}
export default VetProfile;