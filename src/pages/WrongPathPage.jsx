import { Link } from "react-router-dom";
import img from '../styles/img/lost-icon.png'

export default function WrongPathPage() {

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center p-4 pt-md-5">
            <h1 className="title">¿Seguro de que debes estar aquí?</h1>
            <img src={img} className='d-block error-img' alt='imagen vectorial de una pantalla de error' />

            <p>Anda... vuelve al redil</p>

            <Link to="/" className="text-decoration-none">
                <button className="custom-btn">Volver a Inicio</button>
            </Link>
        </div>
    );
}