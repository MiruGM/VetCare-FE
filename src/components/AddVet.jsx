//TODO: VALIDACIÓN DE DATOS
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { peticionPOSTJSON } from "../utils/ajax";

import {
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { Box } from "@mui/system";
import AlertMessage from "./AlertMessage";


function AddVet() {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  const [validFetch, setValidFetch] = useState(null);
  const [veterinarianData, setVeterinarianData] = useState({
    registrationNumber: '',
    name: '',
    email: '',
    password: '123456Aa',
    speciality: 'Doméstico',
    admin: 0
  });

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
    setVeterinarianData(prevState => ({
      ...prevState,
      admin: event.target.checked ? 1 : 0
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVeterinarianData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await peticionPOSTJSON('veterinarians', veterinarianData);

    if (response.ok) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setValidFetch(true);
      setVeterinarianData({
        registrationNumber: '',
        name: '',
        email: '',
        password: '123456Aa',
        specialty: 'domestico',
        admin: 0
      });

      setTimeout(() => {
        navigate("/listvets");
      }, 1500);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setValidFetch(false);
    }

  };

  return (
    <div className="custom-container custom-container__md-main pt-4 px-4 pb-3 mb-5">
      <AlertMessage
        validFetch={validFetch}
        errorMessage="Error al crear el veterinario. Intentelo de nuevo."
        successMessage="Veterinario creado correctamente." />

      <div>
        <h2 className="title text-center">Añadir Veterinario</h2>
      </div>

      <Box component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}
      >

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Nombre"
              id="name"
              name="name"
              type="text"
              value={veterinarianData.name}
              onChange={handleChange}
            // inputProps={{ maxLength: 50 }}
            // error={!isFieldsValid.email}
            // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Correo Electrónico"
              id="email"
              name="email"
              type="text"
              value={veterinarianData.email}
              onChange={handleChange}
            // inputProps={{ maxLength: 50 }}
            // error={!isFieldsValid.email}
            // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
            />
          </Grid>


          <Grid item xs={12} sx={{ my: 2 }}>
            <Divider className="long-divider" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Número de Colegiatura"
              id="registrationNumber"
              name="registrationNumber"
              type="text"
              value={veterinarianData.registrationNumber}
              onChange={handleChange}
            // inputProps={{ maxLength: 50 }}
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
              value={veterinarianData.speciality}
              onChange={handleChange}
            >
              <MenuItem value={'Doméstico'}>Vet. Doméstico</MenuItem>
              <MenuItem value={'Exóticos'}>Vet. Animales Exóticos</MenuItem>
              <MenuItem value={'Aves'}>Vet. Aves</MenuItem>


            </Select>
          </Grid>

          <Grid item xs={12} sx={{ my: 2 }}>
            <Divider className="long-divider" />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox
                sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                checked={checked}
                onChange={handleCheckChange}
              />}
              label="Rol de administrador"
              labelPlacement="end"
            />
          </Grid>
        </Grid>

        <div className="custom-container custom-container__button mb-2">
          <button
            type="submit"
            className="custom-btn">
            Añadir Veterinario
          </button>
        </div>
      </Box>
    </div >
  );
}

export default AddVet;