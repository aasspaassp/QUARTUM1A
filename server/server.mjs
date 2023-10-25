import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import "./loadEnvironment.mjs";
import propiedades from "./routes/propiedades.mjs";

const PORT = process.env.PORT || 5050;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use("/", propiedades);

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// start the Express servernpm 
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});