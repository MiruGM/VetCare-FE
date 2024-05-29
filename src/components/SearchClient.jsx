import { useState } from 'react';
import { peticionGET } from '../utils/ajax';
import { isValidEmail, isValidDni } from "../utils/validators";
import { useAuthStore } from '../hooks/useAuthStore';

import { ButtonGroup, Button, TextField } from '@mui/material';
import ClientInfo from './ClientInfo';

function SearchClient() {
  //TODO: ARREGLAR EL VISUALIZACIÓN DE DATOS DEL CLIENTE EN DESKTOP
  const { setClientId } = useAuthStore();

  const [selectedOption, setSelectedOption] = useState('option1');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [client, setClient] = useState(null);
  const [validDniInput, setValidDniInput] = useState(null);
  const [validEmailInput, setValidEmailInput] = useState(null);

  const [message, setMessage] = useState('');

  async function fetchDataDni() {
    if (isValidDni(dni.trim())) {
      setValidDniInput(true);

      let params = new FormData();
      params.append("client", "true");
      let response = await peticionGET("clients/dni/" + dni, params);

      if (response.ok) {
        const data = response.data;
        setClient(data);
      } else {
        setClient(null);
        setMessage('Cliente no encontrado');
      }
    } else {
      setValidDniInput(false);
    }
  }

  async function fetchDataEmail() {
    if (isValidEmail(email.trim())) {
      setValidEmailInput(true);

      let params = new FormData();
      params.append("client", "true");

      let response = await peticionGET(
        "clients/email/" + email,
        params
      );

      if (response.ok) {
        const data = response.data;
        setClient(data);
      } else {
        setClient(null);
        setMessage('Cliente no encontrado');
      }
    } else {
      setValidEmailInput(false);
    }
  }

  const handleButtonChange = (optionValue) => {
    setSelectedOption(optionValue);
    setClient(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption === 'option1') {
      fetchDataDni();

    } else if (selectedOption === 'option2') {
      fetchDataEmail();
    }
  }

  return (
    <div className="custom-container custom-container__md-main pt-4 px-4 pb-1">
      <div>
        <h2 className="title text-center">Búsqueda de cliente</h2>
      </div>
      <div className="custom-container custom-container__center">
        <ButtonGroup
          className="mt-3"
          variant="contained"
          aria-label="button group"
          sx={{

            fontFamily: 'M PLUS Rounded 1c',
            boxShadow: '0',

            '& .MuiButton-root': {
            },
            '& .MuiButton-contained': {
              color: '#ffffff',
              backgroundColor: '#199ebc',
              border: '2px solid #199ebc',

              '&:hover': {
                border: '2px solid #199ebc',
                backgroundColor: '#127389',
              },
            },
            '& .MuiButton-outlined': {
              border: '2px solid #199ebc',
              color: '#199ebc',

              '&:hover': {
                color: '#ffffff',
                backgroundColor: '#199ebc',
              },
            },
          }}
        >
          <Button
            onClick={() => handleButtonChange('option1')}
            variant={selectedOption === 'option1' ? 'contained' : 'outlined'}
          >
            DNI
          </Button>
          <Button
            onClick={() => handleButtonChange('option2')}
            variant={selectedOption === 'option2' ? 'contained' : 'outlined'}
          >
            EMAIL
          </Button>

        </ButtonGroup>
      </div>


      <div className='mt-4 mx-md-5'>
        <form onSubmit={handleSubmit}>
          <div>
            {
              selectedOption === '' || selectedOption === 'option1' && (
                <div>
                  <TextField
                    required
                    fullWidth
                    id="dni"
                    label="DNI del Cliente"
                    name="dni"
                    type="text"
                    onChange={(e) => setDni(e.target.value)}
                    inputProps={{ maxLength: 9 }}
                    error={validDniInput === false}
                    helperText={validDniInput === false && 'Compruebe el formato del DNI'}
                  />
                </div>
              )
            }

            {
              selectedOption === 'option2' && (
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  error={validEmailInput === false}
                  helperText={validEmailInput === false && 'Compruebe el formato del correo'}
                />

              )
            }
          </div>
          <div className="custom-container custom-container__button">
            <button
              type="submit"
              className="custom-btn mt-3">
              Buscar
            </button>
          </div>

        </form>

      </div>

      <div className='mt-5 mb-5'>
        {client ? (
          <div className="custom-list-style">
            <ClientInfo
              name={client.name}
              dni={client.dni}
              phone={client.phone}
              email={client.email}
              id={client.id}
              setClientId={setClientId}
            />
          </div>
        ) : (
          <h5 className="text-center fw-bold">{message}</h5>
        )}
      </div>
    </div >
  );
}

export default SearchClient;