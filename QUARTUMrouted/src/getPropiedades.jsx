import React, { useEffect, useState } from "react";

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
}