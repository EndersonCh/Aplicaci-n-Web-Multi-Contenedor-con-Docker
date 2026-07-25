const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json()); // Vital para que Express pueda leer los formularios enviados

// 1. Configuración de conexión a PostgreSQL
// Usa los datos que declaramos en el docker-compose.yml
const pool = new Pool({
  user: process.env.DB_USER || "admin",
  host: process.env.DB_HOST || "db",
  database: process.env.DB_NAME || "parcial_db",
  password: process.env.DB_PASSWORD || "clave123",
  port: process.env.DB_PORT || 5432,
});

// 2. Crear la tabla en la base de datos al iniciar el servidor
pool
  .query(
    `
    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`,
  )
  .then(() => console.log("Tabla de base de datos 'posts' verificada/creada"))
  .catch((err) => console.error("Error verificando la tabla:", err));

// 3. Ruta para LEER todos los posts del blog (GET)
app.get("/api/posts", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las entradas" });
  }
});

// 4. Ruta para CREAR un nuevo post (POST)
app.post("/api/posts", async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
      [title, content],
    );
    res.status(201).json(result.rows[0]); // Devuelve el post recién creado
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar la entrada" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor API corriendo en el puerto ${PORT}`);
});
