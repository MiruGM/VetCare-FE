/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import { useAuthStore } from '../hooks/useAuthStore';




function Home() {

  const { isAuthenticated, isVet } = useAuthStore();

  return (
    <>
      {
        !isAuthenticated && (
          <div className="d-flex flex-column flex-sm-row justify-content-md-between align-items-center p-2 text-bg-info">
            <h6 className="text-center h6-info">Atención veterinaria 24 horas </h6>
            <div className="text-center">
              <span className=" me-2 landpage-chip">Consultas: 954 444 444</span>
              <span className="landpage-chip landpage-chip__important">Urgencias: 644 444 444</span>
            </div>

          </div>
        )
      }

      <Menu isAuthenticated={isAuthenticated} isVet={isVet} />
      <div>
        <Outlet className="container d-flex justify-content-center align-items-center vh-100" />
      </div>
    </>
  );
}

export default Home; 