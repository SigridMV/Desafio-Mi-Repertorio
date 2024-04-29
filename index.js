const express = require("express");
const fs = require("fs");
const { insertar, consultar, editar, eliminar } = require("./consultas");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Ruta raíz
app.get("/", (req, res) => {
  res.setHeader("content-type", "text/html");
  const html = fs.readFileSync("index.html", "utf8");
  res.end(html);
});

// Ruta POST
app.post("/cancion", async (req, res) => {
  const datos = Object.values(req.body);
  try {
    // Usa el nuevo nombre de la función
    const respuesta = await insertar(datos);
    res.json(respuesta);
  } catch (error) {
    console.error("Error en la ruta POST /cancion:", error);
    res.status(500).json({ error: "Error en la ruta POST /cancion" });
  }
});

// Ruta GET
app.get("/canciones", async (req, res) => {
  const registros = await consultar();
  res.json(registros.rows);
});

// Ruta PUT
app.put("/cancion", async (req, res) => {
  const datos = Object.values(req.body);
  const respuesta = await editar(datos);
  res.json(respuesta);
});

// Ruta DELETE
app.delete("/cancion", async (req, res) => {
  const { id } = req.query;
  const respuesta = await eliminar(id);
  res.json(respuesta);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
