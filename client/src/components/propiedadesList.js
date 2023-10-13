import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* 
    {
        "_id": "63255e4763966c933163592f",
        "MainAddress": "Paseo de la Reforma 300, Juárez, Cuauhtémoc, 06600 Ciudad de México, CDMX, México",
        "Zona": "Juárez",
        "Precio": 10000000,
        "Coordinates": [
            -99.1377699,
            19.4299317
        ],
        "ShortDescription": "Espectacular departamento en Paseo de la Reforma",
        "Renta": false,
        "Venta": true,l
        "Fotos": [
            "https://example.com/foto1.jpg",
            "https://example.com/foto2.jpg",
            "https://example.com/foto3.jpg"
        ],
        "Recamaras": 3,
        "Baños": 3.5,
        "Estacionamiento": 2,
        "MetrosConstruccion": 150,
        "MetrosTerreno": 200,
        "Niveles": 2,
        "Equipamento": [
            "Cocina integral",
            "Aires acondicionados",
            "Lavadora y secadora"
        ],
        "Amenidades": [
            "Alberca",
            "Gimnasio",
            "Salón de eventos"
        ]
    }
*/
const Propiedad = (props) => (
 <tr>
   <td>{props.propiedad.MainAddress}</td>
   <td>{props.propiedad.Precio}</td>
   <td>{props.propiedad.ShortDescription}</td>
   <td>{props.propiedad.Renta ? 'Renta' : 'Venta'}</td>
   <td>{props.propiedad.Recamaras}</td>
   <td>{props.propiedad.Baños}</td>
   <td>{props.propiedad.Estacionamiento}</td>
   <td>{props.propiedad.MetrosConstruccion}</td>
   <td>{props.propiedad.MetrosTerreno}</td>
   <td>{props.propiedad.Niveles}</td>
 </tr>
);
 
export default function PropiedadesList() {
 const [propiedades, setPropiedades] = useState([]);
 
 // This method fetches the propiedads from the database.
 useEffect(() => {
   async function getPropiedades() {
    // TO DO Add development mode
     const response = await fetch(`http://localhost:5050/propiedades`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const propiedades = await response.json();
     setPropiedades(propiedades);
   }
 
   getPropiedades();
 
   return;
 }, [propiedades.length]);
 

 
 // This method will map out the propiedads on the table
 function propiedadesList() {
   return propiedades.map((propiedad) => {
     return (
       <Propiedad
         propiedad={propiedad}
         key={propiedad._id}
       />
     );
   });
 }
 
 // This following section will display the table with the propiedads of individuals.
 return (
   <div>
     <h3>Lista de propiedades</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Dirección</th>
           <th>Precio</th>
           <th>ShortDescription</th>
           <th>Renta/Venta</th>
           <th>Recámaras</th>
           <th>Baños</th>
           <th>Estacionamiento</th>
           <th>Metros Construcción</th>
           <th>Metros Terreno</th>
           <th>Niveles</th>
         </tr>
       </thead>
       <tbody>{propiedadesList()}</tbody>
     </table>
   </div>
 );
}