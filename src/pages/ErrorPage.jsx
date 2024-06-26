import { Link, useRouteError } from "react-router-dom";
import img from '../styles/img/error-icon.png'


export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center p-4 pt-md-5">
            <h1 className="title">Oops!</h1>
            <img src={img} className='d-block error-img' alt='imagen vectorial de una pantalla de error' />

            <p>Ha ocurrido un error.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/" className="text-decoration-none">
                <button className="custom-btn">Volver a Inicio</button>
            </Link>
        </div>
    );
}