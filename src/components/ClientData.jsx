import useFetchClientByIdData from "../hooks/useFetchClientById";


import { Chip } from '@mui/material';


function ClientData({ appointmentData, handleBtnClick }) {
    const clientData = useFetchClientByIdData();

    return (
        <div>
            <div>
                <h2 className="title text-center" >Datos del Cliente</h2>
            </div>

            <div className="d-grid mt-3">
                <div className="row">
                    <div className="col-12">
                        <span className=" overTitle"> {clientData.name}</span>
                        <span className="small-text"> ({clientData.dni})</span>
                    </div>
                    <div className="col-6">

                        <span className="d-block"> {clientData.email}</span>
                        <span className="d-block">{clientData.phone}</span>
                    </div>
                </div>
                <div className="row">

                </div>

                <label>Elige la mascota: </label>
                <div>
                    {
                        clientData.pets.map((pet) => {
                            return <Chip key={pet.id}
                                className="m-1"
                                label={pet.name}
                                clickable
                                color={appointmentData.petId === pet.id ? 'primary' : 'default'}
                                onClick={() => handleBtnClick('petId', pet.id)}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ClientData; 