//TODO: REGULAR LAS RUTAS
//TODO: CAMBIAR LA RUTA DE PET Y APPINTMET PARA QUE NO SAQUEN EL ID
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './styles/custom.scss';

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import { Navigate } from 'react-router-dom';

import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import LandPage from './components/LandPage';
import Login from './components/Login';

import ListClients from './components/ListClients';
import SearchClients from './components/SearchClient';
import AddClient from './components/AddClient';
import ClientProfile from './components/ClientProfile';

import AddVet from './components/AddVet';
import ListVets from './components/ListVets';
import VetProfile from './components/VetProfile';

import AddPet from './components/AddPet';
import PetProfile from './components/PetProfile';
import AddTreatment from './components/AddTreatment';

import AddAppointment from './components/AddAppointment';
import ListAppointment from './components/ListAppointments';


// const PrivateRoute = ({ element: Element, ...rest }) => {
//   console.log(isAuthenticated);
//   return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
// };

// function useIsAuthenticated() {
//   const isAuthenticated = useAuthStore(state => state.isAuthenticated);
//   return isAuthenticated;
// }

// function useIsVet() {
//   const isVet = useAuthStore(state => state.isVet);
//   return isVet; 
// }

// const { isAuthenticated, isVet } = useAuthStore();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "clientprofile",
        element: <ClientProfile />,
        // element: isAuthenticated ? <ClientProfile /> : <Navigate to="/login" />,
        // guard: PrivateRoute
      },
      {
        path: "addclient",
        element: <AddClient />,
        // element: useIsAuthenticated && isVet ? <ClientProfile /> : <Navigate to="/login" />,
      },
      {
        path: "listclients",
        element: <ListClients />,
      },
      {
        path: "searchclients",
        element: <SearchClients />,
      },
      {
        path: "addpet",
        element: <AddPet />,
      },
      {
        path: "petprofile",
        element: <PetProfile />,
      },
      {
        path: "addtreatment",
        element: <AddTreatment />,
      },
      {
        path: "addappointment",
        element: <AddAppointment />,
      },
      {
        path: "listappointment",
        element: <ListAppointment />,
      },
      {
        path: "addvet",
        element: <AddVet />,
      },
      {
        path: "listvets",
        element: <ListVets />,
      },
      {
        path: "vetprofile",
        element: <VetProfile />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>,
)
