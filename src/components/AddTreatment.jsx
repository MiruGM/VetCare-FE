import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { peticionPOSTJSON } from "../utils/ajax";

import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
  InputAdornment
} from "@mui/material";



function AddTreatment() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();

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

    alert(response.message);

    if (response.ok) {
      navigate("/");
    }

  };

  return (
    <div className="container-sm custom-center-container-md mb-3 p-4">
      <div className="container-center">
        <h3>Añadir Tratamiento</h3>
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
              // label="Motivo"
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
            <TextField
              required
              fullWidth
              label="Nombre"
              id="name"
              name="name"
              type="text"
              value={treatmentData.name}
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
              multiline
              label="Descripción"
              id="description"
              name="description"
              type="text"
              rows={5}
              value={treatmentData.description}
              onChange={handleChange}
            // inputProps={{ maxLength: 50 }}
            // error={!isFieldsValid.email}
            // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
            />
          </Grid>

          <Grid item xs={12} sx={{ my: 2 }}>
            <Divider sx={{ height: 1, bgcolor: 'grey' }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Duración"
              id="duration"
              name="duration"
              type="text"
              value={treatmentData.duration}
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
              label="Frecuencia"
              id="frequency"
              name="frequency"
              type="text"
              value={treatmentData.frequency}
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
              label="Medicación"
              id="meds"
              name="meds"
              type="text"
              value={treatmentData.meds}
              onChange={handleChange}
            // inputProps={{ maxLength: 50 }}
            // error={!isFieldsValid.email}
            // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox
                sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                checked={checked}
                onChange={handleCheckChange}
              />}
              label="Necesidad de seguimiento"
              labelPlacement="end"
            />
          </Grid>

          <Grid item xs={12} sx={{ my: 2 }}>
            <Divider sx={{ height: 1, bgcolor: 'grey' }} />
          </Grid>

          <Grid item xs={12}>
            <TextField
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
            // inputProps={{ maxLength: 50 }}
            // error={!isFieldsValid.email}
            // helperText={!isFieldsValid.email && 'Compruebe el formato del correo'}
            />
          </Grid>
        </Grid>

        <div className="custom-button-display">
          <button
            type="submit"
            className="btn btn-primary mt-3 custom-button">
            Añadir Tratamiento
          </button>
        </div>

      </Box>
    </div >
  );
}

export default AddTreatment;
