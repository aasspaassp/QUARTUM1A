import { Link, useLoaderData, Form, Outlet } from "react-router-dom";

export async function loader() {
  // TO DO Add development mode
  const response = await fetch(`/propiedades`);

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
  return (
    <>
      <div>
        {propiedades.length ? (
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Conoce nuestras propiedades:</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Renta y venta de propiedades amplias, cómodas y seguras.
                </p>
              </div>
              <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                {propiedades.map((propiedad) => (
                  <Link to={`/${propiedad._id}`}>
                  <li key={propiedad._id}>
                    <div className="flex items-center gap-x-6">
                      <div key={propiedad.Fotos[0]}>
                        <img
                          src={`https://drive.google.com/uc?export=view&id=${propiedad.Fotos[0].slice(propiedad.Fotos[0].indexOf("d/") + 2, propiedad.Fotos[0].indexOf("/view"))}` || null}
                          alt="foto propiedad"
                          loading="lazy"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{propiedad.MainAddress}</h3>
                        <p className="text-sm font-semibold leading-6 text-indigo-600">${propiedad.Precio}</p>
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