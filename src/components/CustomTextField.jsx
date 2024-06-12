import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CustomTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'gray-300', // Color del borde por defecto
        },
        '&.Mui-focused fieldset': {
            borderColor: '#199ebc', // Color del borde cuando el campo está enfocado
        },
        '&.Mui-error fieldset': {
            borderColor: '#db2f2f', // Color del borde cuando hay un error
        },
        '&.Mui-error.Mui-focused fieldset': {
            borderColor: '#db2f2f', // Mantiene el color del borde rojo cuando hay un error y el campo está enfocado
        },
    },
    '& .MuiInputLabel-root': {
        color: 'gray-300', // Color del label por defecto
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#199ebc', // Color del label cuando el campo está enfocado
    },
    '& .MuiInputLabel-root.Mui-error': {
        color: '#db2f2f', // Color del label cuando hay un error
    },

}));

export default CustomTextField;