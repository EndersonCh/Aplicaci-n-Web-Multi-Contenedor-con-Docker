const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "¡Hola backend!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor API corriendo en el puerto ${PORT}");
});
