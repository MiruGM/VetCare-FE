import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import esLocale from "date-fns/locale/es";

export default function BasicDatePicker({ datepickerValue, handleDateChange }) {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
			<DatePicker
				label="Fecha de Nacimiento"
				inputFormat="dd-MM-yyyy"
				value={datepickerValue}
				onChange={(newValue) => {
					handleDateChange(newValue);
				}}
				slotProps={{
					textField: { variant: 'outlined', fullWidth: true, required: true },

				}}

				autoFocus={true}
			/>
		</LocalizationProvider>
	);
}