import { useAuthStore } from '../hooks/useAuthStore';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import useFetchAllClientsData from "../hooks/useFetchAllClients";

import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Pagination, Tooltip } from "@mui/material";

import PersonIcon from '@mui/icons-material/Person';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import ClientInfo from './ClientInfo';


function ListClients() {
  const { setClientId } = useAuthStore();
  const clientList = useFetchAllClientsData();

  //Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(8); //Cantidad de clientes por página

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clientList.slice(indexOfFirstClient, indexOfLastClient);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <div className="custom-container custom-container__md-main-table pt-4">
      <div>
        <h2 className="title text-center">Listado de Clientes</h2>
      </div >
      {/* Este div es para móvil => LISTA */}
      <div className="d-block d-md-none" >
        <ul className="list-group list-group-flush mt-3 mx-3">
          {
            currentClients.map((client) => (
              <li key={client.id} className="custom-list-style" >
                <ClientInfo
                  name={client.name}
                  dni={client.dni}
                  phone={client.phone}
                  email={client.email}
                  id={client.id}
                  setClientId={setClientId}
                />
              </li>
            ))
          }
        </ul>

        {
          clientList.length > clientsPerPage && (
            <div className="custom-container custom-container__center mb-4">
              <Pagination
                count={Math.ceil(clientList.length / clientsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
              />
            </div>
          )
        }
      </div >

      {/* Este div es para desktop => TABLA */}
      <div className="d-none d-md-block p-3 m-3" >
        <MDBTable className="custom-table">
          <MDBTableHead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">DNI</th>
              <th scope="col">TELÉFONO</th>
              <th scope="col">E-MAIL</th>
              <th scope="col">MASCOTAS</th>
              <th scope="col">ACCIÓN</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {currentClients.map((row) => (
              <tr key={row.id}>
                <td className="text-center">{row.id}</td>
                <td className="text-left">{row.name}</td>
                <td className="text-center">{row.dni}</td>
                <td className="text-center">{row.phone}</td>
                <td className="text-center">{row.email}</td>
                <td className="text-left">
                  {row.pets.map((pet, index) => (
                    <span key={index}>{pet.name}{index !== row.pets.length - 1 ? ', ' : ''}</span>
                  ))}
                </td>

                <td>
                  <div className="custom-container custom-container__button-table ">
                    <Link to={'/clientprofile'} onClick={() => { setClientId(row.id); }}>
                      <button className="custom-btn custom-btn__clear">
                        <Tooltip title="Perfil">
                          <PersonIcon />
                        </Tooltip>
                      </button>
                    </Link>
                    <Link to={'/addappointment'} onClick={() => { setClientId(row.id); }}>
                      <button className="custom-btn ms-2">
                        <Tooltip title="Agendar Cita">
                          <ContentPasteGoIcon />
                        </Tooltip>
                      </button>
                    </Link>
                  </div>

                </td>
              </tr>
            ))}

          </MDBTableBody>
        </MDBTable>
        {
          clientList.length > clientsPerPage && (
            <div className="custom-container custom-container__center mb-4">
              <div>
                <Pagination
                  count={Math.ceil(clientList.length / clientsPerPage)}
                  page={currentPage}
                  onChange={handleChangePage}
                />
              </div>
            </div>
          )
        }
      </div >
    </div >
  )
}

export default ListClients;