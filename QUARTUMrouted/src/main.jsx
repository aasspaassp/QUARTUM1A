import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import ErrorPage from './error-page'
import Propiedad, {
  loader as porpiedadLoader,
} from "./routes/propiedad";
import Contacto from './routes/contacto'
import Legal from './routes/legal'
import Nav from './components/navbar'
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
  redirect,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    errorElement: <ErrorPage />,
    children: [

  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,

  },
  {
    path: "/venta",
    element: <Root/>,
    loader: async () => {
      const response = await fetch(`/propiedades/filtro/venta`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
    
      const propiedades = await response.json();
      console.log('respuesta servidor', propiedades)
      return { propiedades }
    }  
  },
  {
    path: "/renta",
    element: <Root/>,
    loader: async () => {
      const response = await fetch(`/propiedades/filtro/renta`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
    
      const propiedades = await response.json();
      console.log('respuesta servidor', propiedades)
      return { propiedades }
    }  
  },
  {
    path: "propiedades/:propiedadId",
    element: <Propiedad />,
    loader: porpiedadLoader,
  },

  {
    path: "contacto",
    element: <Contacto />,
  },
  {
    path: "legal",
    element: <Legal />,

  },
    ]
  }

])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

