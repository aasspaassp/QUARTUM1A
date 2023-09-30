import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root,  { loader as rootLoader, action as rootAction } from './routes/root'
import ErrorPage from './error-page'
import Propiedad, {
  loader as porpiedadLoader,
} from "./routes/propiedad";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "propiedades/:propiedadId",
        element: <Propiedad />,
        loader: porpiedadLoader,
      },
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

