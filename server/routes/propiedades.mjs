import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("Propiedades");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Propiedades");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

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
        "Venta": true,
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
// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    MainAddres: req.body.MainAddres,
    Zona: req.body.Zona,
    Precio: req.body.Precio,
    Coordinates: req.body.Coordinates,
    ShortDescription: req.body.ShortDescription,
    Renta: req.body.Renta,
    Venta: req.body.Venta,
    Fotos: req.body.Fotos,
    Recamaras: req.body.Recamaras,
    Baños: req.body.Baños,
    Estacionamiento: req.body.Estacionamiento,
    MetrosConstruccion: req.body.MetrosConstruccion,
    MetrosTerreno: req.body.MetrosTerreno,
    Niveles: req.body.Niveles,
    Equipamento: req.body.Equipamento,
    Amenidades: req.body.Equipamento,
  };
  let collection = await db.collection("propiedades");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      MainAddres: req.body.MainAddres,
      Zona: req.body.Zona,
      Precio: req.body.Precio,
      Coordinates: req.body.Coordinates,
      ShortDescription: req.body.ShortDescription,
      Renta: req.body.Renta,
      Venta: req.body.Venta,
      Fotos: req.body.Fotos,
      Recamaras: req.body.Recamaras,
      Baños: req.body.Baños,
      Estacionamiento: req.body.Estacionamiento,
      MetrosConstruccion: req.body.MetrosConstruccion,
      MetrosTerreno: req.body.MetrosTerreno,
      Niveles: req.body.Niveles,
      Equipamento: req.body.Equipamento,
      Amenidades: req.body.Equipamento,
    }
  };

  let collection = await db.collection("propiedades");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("peopiedades");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;