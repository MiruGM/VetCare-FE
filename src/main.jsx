import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './styles/custom.scss';

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from './utils/ProtectedRoutes';

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
        element: <ProtectedRoute element={ClientProfile} requiredRole="general" />,
      },
      {
        path: "addclient",
        element: <ProtectedRoute element={AddClient} requiredRole="vet" />,
      },
      {
        path: "listclients",
        element: <ProtectedRoute element={ListClients} requiredRole="vet" />,
      },
      {
        path: "searchclients",
        element: <ProtectedRoute element={SearchClients} requiredRole="vet" />,
      },
      {
        path: "addpet",
        element: <ProtectedRoute element={AddPet} requiredRole="vet" />,
      },
      {
        path: "petprofile",
        element: <ProtectedRoute element={PetProfile} requiredRole="general" />,
      },
      {
        path: "addtreatment",
        element: <ProtectedRoute element={AddTreatment} requiredRole="vet" />,
      },
      {
        path: "addappointment",
        element: <ProtectedRoute element={AddAppointment} requiredRole="general" />,
      },
      {
        path: "listappointment",
        element: <ProtectedRoute element={ListAppointment} requiredRole="vet" />,
      },
      {
        path: "addvet",
        element: <ProtectedRoute element={AddVet} requiredRole="admin" />,
      },
      {
        path: "listvets",
        element: <ProtectedRoute element={ListVets} requiredRole="admin" />,
      },
      {
        path: "vetprofile",
        element: <ProtectedRoute element={VetProfile} requiredRole="admin" />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
