import { forwardRef } from "react";

const Footer = forwardRef((props, ref) => (
  <div ref={ref}>
    <footer className="text-bg-info text-center text-lg-start" >
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="title title__footer">Información de contacto</h5>
            <p>
              <span className="d-block">
                <span className="fw-bold">Teléfono:</span> 954 444 444
              </span>
              <span className="d-block">
                <span className="fw-bold">Correo:</span> info@vet-care.com
              </span>
              <span className="d-block">
                <span className="fw-bold">Dirección:</span> Calle Tokio, 13, 41089 Montequinto, Dos Hermanas
              </span>
            </p>
          </div>

          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="title title__footer">Horario de Atención</h5>
            <p>
              <span className="fw-bold">Citas: </span>
              Lunes a Viernes de 10:00h a 13:00h & 17:30h a 20:30h
            </p>
            <p>
              <span className="fw-bold">Para urgencias las 24h:</span> 644 444 444
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
));

Footer.displayName = 'Footer';

export default Footer;