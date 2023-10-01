import { Outlet, Link, useLoaderData, Form } from "react-router-dom";

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
      <div id="sidebar">
        <h1>QUARTUM</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Buscar propiedades"
              placeholder="Buscar"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {propiedades.length ? (
            <ul>
              {propiedades.map((propiedad) => (
                <li key={propiedad._id}>
                  <Link to={`propiedades/${propiedad._id}`}>
                    {propiedad.MainAddress ? (
                      <>
                        <h2>{propiedad.MainAddress}</h2><h2>{propiedad.Zona}</h2>
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail"><Outlet /></div>
    </>
  );
}