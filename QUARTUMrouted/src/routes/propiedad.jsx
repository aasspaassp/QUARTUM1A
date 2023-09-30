import { lazy } from "react";
import { Form, useLoaderData } from "react-router-dom";

export async function loader({params}) {
  const response = await  fetch('http://localhost:5050/propiedades/' + params.propiedadId);
  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }
  const propiedad = await response.json();
  console.log('respuesta servidor', propiedad)
  return { propiedad }

}

export default function Propiedad() {

 /*  const propiedad = {
    _id: "63255e4763966c933163592f",
    MainAddress: "Paseo de la Reforma 300, Juárez, Cuauhtémoc, 06600 Ciudad de México, CDMX, México",
    Zona: "Juárez",
    Precio: 10000000,
    // de momento esto podría ser un link de google maps
    Coordinates: [
      -99.1377699,
      19.4299317
    ],
    ShortDescription: "Espectacular departamento en Paseo de la Reforma",
    Renta: false,
    Venta: true,
    Fotos: [
      "https://example.com/foto1.jpg",
      "https://example.com/foto2.jpg",
      "https://example.com/foto3.jpg"
    ],
    Recamaras: 3,
    Baños: 3.5,
    Estacionamiento: 2,
    MetrosConstruccion: 150,
    MetrosTerreno: 200,
    Niveles: 2,
    Equipamento: [
      "Cocina integral",
      "Aires acondicionados",
      "Lavadora y secadora"
    ],
    Amenidades: [
      "Alberca",
      "Gimnasio",
      "Salón de eventos"
    ]
  } */

  const { propiedad } = useLoaderData();
  console.log(propiedad);

    const fotos = propiedad.Fotos.map((foto) =>  
    <div key={foto}>
    <img
      src={`https://drive.google.com/uc?export=view&id=${foto.slice(foto.indexOf("d/") + 2,foto.indexOf("/view"))}` || null}
      alt="foto propiedad"
      loading="lazy"
    />
  </div>
    )
 
    
    return(
        <div id="propiedad">
        <div>{fotos}</div>
        <div>
          <h1>
            {propiedad.MainAddress}
            <Favorite propiedad={propiedad} />
          </h1>
  
          {propiedad.Coordinates && (
            <p>
              <a
                target="_blank"
                href={`https://www.google.com/maps/@${propiedad.Coordinates[0]},${propiedad.Coordinates[1]},15z?entry=ttu`}
              >
                Ubicación
              </a>
            </p>
          )}
  
          {propiedad.Precio && <p>{propiedad.Precio}</p>}
  
          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event) => {
                if (
                  !confirm(
                    "Please confirm you want to delete this record."
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
      </div>
    )
}

function Favorite({ propiedad }) {
  // yes, this is a `let` for later
  let favorite = propiedad.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}