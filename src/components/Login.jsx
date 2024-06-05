import { useState } from "react";
import { peticionPOSTJSON } from "../utils/ajax";
import { useAuthStore } from '../hooks/useAuthStore';
import { useNavigate } from "react-router-dom";

import { isValidEmail, isValidPassword } from "../utils/validators";

import { Box, Grid, TextField, IconButton, InputAdornment, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AlertMessage from "./AlertMessage";

function Login() {
  const { setIsAuthenticated, setIsVet, setClientId } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [validFetch, setValidFetch] = useState(null);
  const validationObj = {
    email: true,
    password: true
  };
  const [isFieldsValid, setIsFieldsValid] = useState(validationObj);


  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (validation(data)) {
      //Crear el objeto con el 
      let oLogin = {
        email: data.get("email").trim(),
        password: data.get("password").trim()
      };

      //Enviar la petición 
      let response = await peticionPOSTJSON("login", oLogin);

      if (response.ok && response.message === "Veterinario logueado") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsAuthenticated(true);
        setIsVet(true);
        setValidFetch(true);
        setTimeout(() => {
          navigate("/listclients");
        }, 2000);
      } else if (response.ok && response.message === "Cliente logueado") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsAuthenticated(true);
        setIsVet(false);
        setClientId(response.data.id);
        setValidFetch(true);
        setTimeout(() => {
          navigate("/clientprofile");
        }, 2000);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setValidFetch(false);
      }
    }
  };

  function validation(data) {
    let valid = true;
    //Copiar del objeto de  valicación 
    let errors = { ...validationObj };

    //Recuperar los datos a validar
    let email = data.get("email").trim();
    let password = data.get("password").trim();

    //Validar el correo 
    if (!isValidEmail(email)) {
      valid = false;
      errors = {
        ...errors,
        email: false
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

  return (
    <div className="container custom-container custom-container__login custom-container__md-main mb-3">

      <AlertMessage
        validFetch={validFetch}
        errorMessage="Error en el correo o la contraseña. Por favor compruebe sus credenciales."
        successMessage="Login correcto. Redireccionando." />

      <div>
        <h2 className="title text-center">Iniciar Sesión</h2>
      </div>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              type="text"
              className="custom-textfield"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!isFieldsValid.email}
              helperText={!isFieldsValid.email && "Formato del email incorrecto"}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="Contraseña"
              name="password"
              className="custom-textfield"

              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!isFieldsValid.password}
              helperText={!isFieldsValid.password && "Formato de la contraseña incorrecto"}
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
        </Grid>

        <div className="custom-container custom-container__button">
          <button
            type="submit"
            className="custom-btn mt-3 ">
            Iniciar sesión
          </button>
        </div>

      </Box>
    </div>

  );
}

export default Login; 