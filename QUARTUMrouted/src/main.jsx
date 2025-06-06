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
//import Header from './components/header'
import ImageHeader from './components/imageHeader'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    errorElement: <ErrorPage />,
    children: [

  {
    path: "/",
    element: <ImageHeader/>,
  },
  {
    path: "/propiedades",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
  },
  {
    path: ":propiedadId",
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

