function PetInfo({ petData, clientData }) {
    return (
        <div className="mb-4 ">
            <div>
                <h2 className="title text-center">{petData.name}</h2>
            </div>
            <div className="container mt-4 ">

                <div className="row">
                    <div className="col-12 col-lg-6">
                        <span className="fw-bold">Dueño:</span> {clientData.name}
                    </div>
                    <div className="col-12 col-lg-6 mt-2 mt-lg-0">
                        <span className="fw-bold">Identificador:</span> {petData.registrationNumber}
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 col-md-6">
                        <span className="fw-bold">Nacimiento:</span> {new Date(petData.birthDate).toLocaleDateString()}
                    </div>
                    <div className="col-6 col-md-6 mt-2 ">
                        <span className="fw-bold">Sexo:</span> {petData.sex === "F" ? "Hembra" : "Macho"}
                    </div>
                    <div className="col-6 col-md-4 mt-2 ">
                        <span className="fw-bold">Tipo:</span> {petData.type}
                    </div>
                    <div className="col-6 col-md-4 mt-2 ">
                        <span className="fw-bold">Especie:</span> {petData.species}
                    </div>
                    <div className="col-6 col-md-4 mt-2 ">
                        <span className="fw-bold">Raza:</span> {petData.breed}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PetInfo; 