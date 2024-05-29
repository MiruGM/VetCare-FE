import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';

import img1 from '../styles/img/carousel-1.png'
import img2 from '../styles/img/carousel-2.png'
import img3 from '../styles/img/carousel-3.png'

export default function App() {
    return (
        <MDBCarousel showControls showIndicators>
            <MDBCarouselItem itemId={1}>
                <img src={img1} className='d-block w-100' alt='Perro pomeranian en la mesa junto a dos veterinarios' />
                <MDBCarouselCaption>
                    <h2>El mejor cuidado para la mascota</h2>
                    <p>No dude en visitar nuestras instalaciones</p>
                </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2}>
                <img src={img2} className='d-block w-100' alt='Peluquera canina atendiendo a un perro yorkshire' />

                <MDBCarouselCaption>
                    <h2>¡Peluquería para todos!</h2>
                    <p>Ponga guapas a sus mascotas</p>
                </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId={3}>
                <img src={img3} className='d-block w-100' alt='Veterinaria atendiendo a un gato' />
                <MDBCarouselCaption>
                    <h2>Atención personalizada</h2>
                    <p>Cada mascota es única y por tanto los tratamos como tal</p>
                </MDBCarouselCaption>
            </MDBCarouselItem>
        </MDBCarousel>
    );
}