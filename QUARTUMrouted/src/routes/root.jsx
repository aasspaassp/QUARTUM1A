import { Link, useLoaderData, Form, Outlet } from "react-router-dom";
import { useState } from "react";
import devEnv from '../constants/ambiente'


import TipoDePropiedad from "../components/tipoDePropiedad";
import Filterbar from "../components/filterbar";

export async function loader() {
  // TO DO Add development mode
  const response = await fetch(`/api`);

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const propiedades = await response.json();
  console.log('respuesta servidor', propiedades)
  return { propiedades }
}

export async function action(propiedad) {
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propiedad),
    });

    // If the request was successful, return the response data.
    if (response.status === 204) {
      return response.json();
    } else {
      // Otherwise, throw an error.
      throw new Error(`Failed to post property: ${response.statusText}`);
    }
  } catch (error) {
    // Handle the error here.
    console.log(error);
  }
};

export default function Root() {
  const { propiedades } = useLoaderData();

  const [filters, setFilters] = useState({
    venta: true,
    renta: true,
    categoria: 'todo'
  })

  function getFilteredPropiedades(propiedades, filters) {
    let newList = [...propiedades];
    if (filters.venta && filters.renta && filters.categoria === 'todo') {
      return newList
    }
    if (filters.venta && !filters.renta) {
      newList = newList.filter(propiedad => propiedad.Venta)
    }
    if(!filters.venta && filters.renta){
      newList = newList.filter(propiedad => propiedad.Renta)
    }
    return filters.categoria === 'todo'? newList : newList.filter(propiedad => propiedad.tipoDePropiedad === filters.categoria)
  }

  const visiblePropiedades = getFilteredPropiedades(propiedades, filters);




  return (
    <>
  
   
       <div className="max-w-2xl p-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Conoce nuestras propiedades:</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Renta y venta de propiedades amplias, cómodas y seguras.
                </p>
              </div>
              <div className="flex flex-col justify-around xl:flex-row px-6">
        <Filterbar className='px-4' filterFunction={setFilters} />
       <TipoDePropiedad className='px-4' filterFunction={setFilters} />
       </div>
      <div>
        {visiblePropiedades.length ? (
          <div className="bg-white py-12 sm:py-12">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
              <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-3">
                {visiblePropiedades.map((propiedad) => (
                  <Link to={`/${propiedad._id}`}>
                  <li key={propiedad._id}>
                    <div className="flex items-center gap-x-6 flex-col">
                      <div key={propiedad.Fotos[0]}>
                        <img
                          src={`https://lh3.googleusercontent.com/d/${propiedad.Fotos[0].slice(propiedad.Fotos[0].indexOf("d/") + 2, propiedad.Fotos[0].indexOf("/view"))}` || null}
                          alt="foto propiedad"
                          loading="lazy"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{propiedad.MainAddress}</h3>
                        <p className="text-sm font-semibold leading-6 text-indigo-600">{new Intl.NumberFormat('mx-MX', { style: 'currency', currency: 'MXN' }).format(Number.parseFloat(propiedad.Precio))}</p>
                        {propiedad.porMetroCuadrado && <p className="text-sm font-semibold leading-6 text-indigo-60o">por metro cuadrado</p>}
                      </div>
                    </div>
                  </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>
            <i>No propiedades</i>
          </p>
        )}
      </div>


    </>
  );
}