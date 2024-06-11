
import useFetchAllVetsData from "../hooks/useFetchAllVets";
import AlertModal from "./AlertModal";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { Alert, Pagination, Tooltip } from "@mui/material";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { peticionDELETE } from "../utils/ajax";
import { useAuthStore } from "../hooks/useAuthStore";


function ListVets() {
	const navigate = useNavigate();
	const { setVetId } = useAuthStore();
	const [reload, setReload] = useState(false);
	const vets = useFetchAllVetsData({ reload });

	// Paginación
	const [currentPage, setCurrentPage] = useState(1);
	const [vetsPerPage] = useState(8); //Cantidad de veterinarios por página

	const indexOfLastAppointment = currentPage * vetsPerPage;
	const indexOfFirstAppointment = indexOfLastAppointment - vetsPerPage;
	const currentVets = vets.slice(indexOfFirstAppointment, indexOfLastAppointment);

	const handleChangePage = (event, newPage) => {
		setCurrentPage(newPage);
	};

	//Navegación al perfil 
	const handleNavigation = (vetId) => {
		setVetId(vetId);
		navigate("/vetprofile/");
	};

	//Manejar el modal de confirmación
	const [basicModal, setBasicModal] = useState(false);
	const [selectedVetId, setSelectedVetId] = useState(null);
	const [alert, setAlert] = useState(false);
	const [responseOk, setResponseOk] = useState(false);

	const toggleOpen = () => setBasicModal(!basicModal);

	//Eliminar veterinario
	const handleDelete = (vetId) => {
		toggleOpen();
		setSelectedVetId(vetId);
	};

	const confirmDelete = async () => {
		let response = await peticionDELETE("veterinarians/" + selectedVetId);

		if (response.ok) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setResponseOk(true);
			toggleOpen();
			setAlert(true);
			setReload(!reload);
			setTimeout(() => {
				setAlert(false);
			}, 3000);

		} else {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setResponseOk(false);
			toggleOpen();
			setAlert(true);
			setTimeout(() => {
				setAlert(false);
			}, 3000);

		}
	};

	return (
		<div className="custom-container custom-container__md-main-table py-4 px-md-4">
			<AlertModal
				basicModal={basicModal}
				setBasicModal={setBasicModal}
				toggleOpen={toggleOpen}
				title="Eliminar Cita"
				text="¿Estás seguro que deseas eliminar esta cita?"
				onConfirm={confirmDelete}
			/>

			{
				alert && (responseOk
					? (<div className="mb-3 px-5">
						<Alert severity="success">Trabajador eliminado correctamente.</Alert>
					</div>)
					: (<div className="mb-3 px-5">
						<Alert severity="error">Error al eliminar el trabajador.</Alert>
					</div>))
			}

			<div>
				<h2 className="title text-center">Plantilla de Veterinarios</h2>
			</div>

			{/* Este div es para móvil => LISTA */}
			<div className="d-block d-md-none">
				<ul className="list-group list-group-flush m-3">
					{
						currentVets.map((vet) => (
							<li key={vet.id} className="custom-list-style " >
								<div className="container p-1">
									<h6 className="text-center overTitle mb-0">{vet.name}</h6>
									<div className="d-block text-center mb-2 small-text">({vet.registrationNumber})</div>
									<div className="d-block mb-1"><span className="fw-bold">Correo: </span>{vet.email}</div>
									<div className="d-block"><span className="fw-bold">Especialidad:</span> {vet.speciality}</div>

									<div className="custom-container custom-container__button mt-2">
										<button className="mt-2 custom-btn custom-btn__clear" onClick={() => handleNavigation(vet.id)}>Editar</button>
									</div>

									<div className="custom-container custom-container__button">
										<button className="mt-2 custom-btn custom-btn__soft" onClick={() => handleDelete(vet.id)}>Eliminar</button>
									</div>
								</div>
							</li>
						))
					}
				</ul>
			</div>

			{/* Este div es para desktop => TABLA */}
			<div className="d-none d-md-block">
				<MDBTable className="custom-table">
					<MDBTableHead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">NOMBRE</th>
							<th scope="col">COLEGIATURA</th>
							<th scope="col">CORREO</th>
							<th scope="col">ESPECIALIDAD</th>
							<th scope="col">ADMIN</th>
							<th scope="col">ACCIONES</th>
						</tr>
					</MDBTableHead>
					<MDBTableBody>
						{currentVets.map((row) => (
							<tr key={row.id}>
								<td className="text-center">{row.id}</td>
								<td>{row.name}</td>
								<td className="text-center">{row.registrationNumber}</td>
								<td >{row.email}</td>
								<td className="text-center">{row.speciality}</td>
								<td className="text-center">{row.admin ? "Sí" : "No"}</td>
								<td>
									<div className="custom-container custom-container__button-table ">
										<button className="custom-btn" onClick={() => handleNavigation(row.id)}>
											<Tooltip title="Editar">
												<EditNoteRoundedIcon />
											</Tooltip>
										</button>
										<button className="custom-btn custom-btn__soft ms-2" onClick={() => handleDelete(row.id)} >
											<Tooltip title="Eliminar">
												<DeleteIcon />
											</Tooltip>
										</button>

									</div>

								</td>
							</tr>
						))}

					</MDBTableBody>
				</MDBTable>
			</div>

			{
				vets.length > vetsPerPage && (
					<div className="custom-container custom-container__center">
						<Pagination
							count={Math.ceil(vets.length / vetsPerPage)}
							page={currentPage}
							onChange={handleChangePage}
						/>
					</div>
				)
			}
		</div>
	);
}

export default ListVets; 