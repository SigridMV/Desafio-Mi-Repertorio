// Importando módulos
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Función asincrónica para insertar
const insertar = async (datos) => {
  const consulta = {
    text: `INSERT INTO canciones (titulo,artista,tono) VALUES ($1,$2,$3) RETURNING *`,
    values: datos,
  };

  try {
    const result = await pool.query(consulta);
    console.log(`Registro agregado con éxito.`);
    return result;
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    return { error: "Error al insertar en la base de datos" };
  }
};

// Función asincrónica para consultar
const consultar = async () => {
  try {
    const result = await pool.query("SELECT * FROM canciones");
    return result;
  } catch (error) {
    console.log(error.code);
    return error;
  }
};

// Función asincrónica para editar
const editar = async (datos) => {
  const consulta = {
    text: `UPDATE canciones SET
        titulo = $2,
        artista = $3,
        tono = $4
        WHERE id = $1 RETURNING *;`,
    values: datos,
  };

  // Try-catch para generar la consulta
  try {
    const result = await pool.query(consulta);
    console.log(`Registro actualizado con éxito.`);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Función asincrónica para eliminar
const eliminar = async (id) => {
  try {
    const result = await pool.query(`DELETE FROM canciones WHERE id = '${id}'`);
  } catch (error) {
    console.log(error.code);
    return error;
  }
};

// Exportando funciones
module.exports = { insertar, consultar, editar, eliminar };
