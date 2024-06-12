import { useNavigate } from "react-router-dom";

import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function ClientInfo({ name, dni, phone, email, id, setClientId }) {
  const navigate = useNavigate();


  const handleBtnClick = (btnType) => {
    setClientId(id);

    if (btnType === "profile") {
      navigate("/clientprofile");
    } else if (btnType === "app") {
      navigate("/addappointment");
    }

  };

  return (
    <div className="custom-list-style">
      <div className="container">

        <div className="row">
          <div className="col-12">
            <h6 className="text-center overTitle mb-0">{name}</h6>
            <span className="d-block text-center mb-2 small-text">({dni})</span>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6">
            <span ><PhoneIphoneIcon className="me-2" />{phone}</span>
          </div>
          <div className="col-12 col-sm-6">
            <span><MailOutlineIcon className="me-2" />{email}</span>
          </div>
        </div>
      </div>

      <div className="custom-container custom-container__button mt-3">
        <button
          type="button"
          className="custom-btn custom-btn__clear"
          onClick={() => handleBtnClick("profile")}
        >
          Ir al Perfil
        </button>

        <button
          type="button"
          className="mt-2 mt-md-0 custom-btn"
          onClick={() => handleBtnClick("app")}
        >
          Agendar Cita
        </button>
      </div >
    </div >

  );
}

export default ClientInfo;