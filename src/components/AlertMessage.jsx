import { Alert } from "@mui/material";


function AlertMessage({ validFetch, errorMessage, successMessage }) {

	return (
		<>
			{
				validFetch === false
					? (
						<div className="mb-3">
							<Alert severity="error">{errorMessage}</Alert>
						</div>)
					: validFetch !== null && (
						<div className="mb-3">
							<Alert severity="success">{successMessage}</Alert>
						</div>)
			}
		</>

	);
}

export default AlertMessage;