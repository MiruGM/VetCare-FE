import { Link } from 'react-router-dom';

import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function ClientInfo({ name, dni, phone, email, id, setClientId }) {

  return (
    <>
      <div className="d-block d-sm-none">
        <h6 className="text-center overTitle mb-0">{name}</h6>
        <span className="d-block text-center mb-2 small-text">({dni})</span>
        <span className="d-block mb-1"><PhoneIphoneIcon className="me-2" />{phone}</span>
        <span className="d-block"><MailOutlineIcon className="me-2" />{email}</span>

        <Link to={'/clientprofile'} onClick={() => { setClientId(id); }}>
          <div className="custom-container custom-container__button mt-2">
            <button className="mt-2 custom-btn custom-btn__clear">Ir al Perfil</button>
          </div>
        </Link>

        <Link to={'/addappointment'} onClick={() => { setClientId(id); }}>
          <div className="custom-container custom-container__button">
            <button className="mt-2 custom-btn">Agendar Cita</button>
          </div>
        </Link>
      </div>

      <div className="d-none d-sm-block">
        <div className="d-block ">
          <h6 className="text-center overTitle mb-0">{name}</h6>
          <span className="d-block text-center mb-2 small-text">({dni})</span>
        </div>

        <div className="d-flex flex-row justify-content-evenly mt-2">
          <span className="d-block mb-1"><PhoneIphoneIcon className="me-2" />{phone}</span>
          <span className="d-block"><MailOutlineIcon className="me-2" />{email}</span>
        </div>

        <div className="d-flex flex-row justify-content-evenly mt-3">
          <Link to={'/clientprofile'} onClick={() => { setClientId(id); }}>
            <div className="custom-container custom-container__md-button">
              <button className="mt-2 custom-btn custom-btn__clear">Ir al Perfil</button>
            </div>
          </Link >

          <Link to={'/addappointment'} onClick={() => { setClientId(id); }}>
            <div className="custom-container custom-container__md-button ms-3 ">
              <button className="mt-2 custom-btn">Agendar Cita</button>
            </div>
          </Link>
        </div >

      </div >
    </>

  );
}

export default ClientInfo;