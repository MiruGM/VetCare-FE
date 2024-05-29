import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBNavbarLink,
} from 'mdb-react-ui-kit';
import logo from '../styles/img/logo-vetcare.png'


function Menu({ isAuthenticated, isVet }) {
  const [openBasic, setOpenBasic] = useState(false);
  const { setIsAuthenticated, setIsVet } = useAuthStore();

  const navigate = useNavigate();

  // Cerrar se sesión
  const handleLogout = () => {
    // Seteo los valores a falso
    setIsVet(false);
    setIsAuthenticated(false);
    //Limpio el localStorage
    localStorage.clear()
    // Navegar a la pagina de inicio
    navigate("/");
  };

  //Cerrar el menú al hacer click en un enlace
  const closeMenu = () => {
    setOpenBasic(!openBasic);
  }

  return (
    <>
      <MDBNavbar expand='lg' light bgColor='light' >
        <MDBContainer fluid className="mx-2 align-middle" >
          <img
            src={logo}
            className='img-fluid'
            alt='Logotipo de VetCare: perfil de un perro y un gato con el simbolo de la cruz de medicina'
            width="65"
            height="65" />

          <Link to="/">

            <MDBNavbarBrand className='brand-title'>VetCare</MDBNavbarBrand>
          </Link>

          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={closeMenu}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar open={openBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 px-3'>

              {isAuthenticated && isVet && (
                <>
                  <MDBNavbarItem>
                    <MDBDropdown>
                      <MDBDropdownToggle tag='a' className='nav-link mt-lg-3' role='button'>
                        Clientes
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to="listclients">
                          <MDBDropdownItem link>Listado de Clientes</MDBDropdownItem>
                        </Link>
                        <Link to="searchclients">
                          <MDBDropdownItem link>Buscar Cliente</MDBDropdownItem>
                        </Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>

                  <MDBNavbarItem>
                    <MDBDropdown>
                      <MDBDropdownToggle tag='a' className='nav-link mt-lg-3' role='button'>
                        Registros
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <Link to="addclient">
                          <MDBDropdownItem link>Alta de cliente</MDBDropdownItem>
                        </Link>
                        <Link to="addtreatment">
                          <MDBDropdownItem link>Alta de veterinario</MDBDropdownItem>
                        </Link>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>

                  <MDBNavbarItem>
                    <MDBNavbarLink className="mt-lg-3">
                      <Link to="listappointment">Listado Citas</Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}

              {isAuthenticated && !isVet && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink className="mt-lg-3">
                      <Link to="clientprofile">Mi Perfil</Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>

                  <MDBNavbarItem>
                    <MDBNavbarLink className="mt-lg-3">
                      <Link to="addappointment">Agendar Cita</Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}

              <MDBNavbarItem className='ml-auto mb-2'>
                {
                  isAuthenticated ? (
                    <div className="mt-3">
                      <button className="custom-btn custom-btn__soft" onClick={handleLogout}>Salir</button>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <button className="custom-btn" onClick={() => { navigate("/login") }}>Entrar</button>
                    </div>
                  )
                }
              </MDBNavbarItem>

            </MDBNavbarNav>

          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar >
    </>

  );
}

export default Menu;