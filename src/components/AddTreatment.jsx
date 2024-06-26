import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../hooks/useAuthStore';

import { peticionPOSTJSON } from "../utils/ajax";
import AlertMessage from "./AlertMessage";

import {
  Box,
  Grid,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  Divider,
  InputAdornment
} from "@mui/material";
import CustomTextField from "./CustomTextField";


function AddTreatment() {
  const navigate = useNavigate();
  const { appointmentId } = useAuthStore();

  const [validFetch, setValidFetch] = useState(null);
  const [checked, setChecked] = useState(false);
  const [treatmentData, setTreatmentData] = useState({
    reason: 'Revisión',
    name: '',
    description: '',
    duration: '',
    meds: '',
    frequency: '',
    price: 0,
    followUp: 0,
    appointmentId: appointmentId
  });


  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
    setTreatmentData(prevState => ({
      ...prevState,
      followUp: event.target.checked ? 1 : 0
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTreatmentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await peticionPOSTJSON('treatments', treatmentData);

    if (response.ok) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setValidFetch(true);
      setTreatmentData({
        reason: 'Revisión',
        name: '',
        description: '',
        duration: '',
        meds: '',
        frequency: '',
        price: 0,
        followUp: 0,
        appointmentId: appointmentId
      });

      setTimeout(() => {
        navigate("/petprofile");
      }, 2000);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setValidFetch(false);
    }

  };

  return (
    <div className="custom-container custom-container__md-main pt-4 px-4 pb-3 mb-5">

      <AlertMessage
        validFetch={validFetch}
        errorMessage="Error al crear el tratamiento. Intentelo de nuevo."
        successMessage="Tratamiento creado correctamente." />

      <div>
        <h2 className="title text-center">Añadir Tratamiento</h2>
      </div>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Select
              required
              fullWidth
              id="reason"
              name="reason"
              labelId="reason-label"
              value={treatmentData.reason}
              onChange={handleChange}
            >
              <MenuItem value={'Revisión'}>Revisión</MenuItem>
              <MenuItem value={'Cirugía'}>Cirugía</MenuItem>
              <MenuItem value={'Vacunación'}>Vacunación</MenuItem>
              <MenuItem value={'Cura'}>Cura</MenuItem>
              <MenuItem value={'Muestras'}>Muestras</MenuItem>

            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              required
              fullWidth
              label="Nombre"
              id="name"
              name="name"
              type="text"
              value={treatmentData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              required
              fullWidth
              multiline
              label="Descripción"
              id="description"
              name="description"
              type="text"
              rows={5}
              value={treatmentData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ my: 2 }}>
            <Divider className="long-divider mb-4" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              required
              fullWidth
              label="Duración"
              id="duration"
              name="duration"
              type="text"
              value={treatmentData.duration}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              required
              fullWidth
              label="Frecuencia"
              id="frequency"
              name="frequency"
              type="text"
              value={treatmentData.frequency}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              required
              fullWidth
              label="Medicación"
              id="meds"
              name="meds"
              type="text"
              value={treatmentData.meds}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 24 },
                  '&.Mui-checked': {
                    color: '#199ebc',
                  },
                }}
                checked={checked}
                onChange={handleCheckChange}
              />}
              label="Necesidad de seguimiento"
              labelPlacement="end"
            />
          </Grid>

          <Grid item xs={12} sx={{ my: 2 }}>
            <Divider className="long-divider mb-4" />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              required
              fullWidth
              label="Precio"
              id="price"
              name="price"
              type="number"

              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              value={treatmentData.price}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <div className="custom-container custom-container__button">
          <button
            type="submit"
            className="custom-btn">
            Añadir Tratamiento
          </button>
        </div>

      </Box>
    </div >
  );
}

export default AddTreatment;
