import { Link, useRouteError } from "react-router-dom";
import { MDBBtn } from 'mdb-react-ui-kit';


export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center mt-5 pt-5">
            <h1 className="mt-5">Oops!</h1>
            <p>Ha ocurrido un error.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/" className="text-decoration-none">
                <MDBBtn color="primary">Volver a Inicio</MDBBtn>
            </Link>
        </div>
    );
}