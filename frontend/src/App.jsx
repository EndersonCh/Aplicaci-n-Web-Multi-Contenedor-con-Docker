import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [mensajeBackend, setMensajeBackend] = useState("Conectando...");

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((respuesta) => respuesta.json())
      .then((datos) => setMensajeBackend(datos.message))
      .catch((error) => {
        console.error("Error en la petición", error);
        setMensajeBackend("Fallo la comunicacion con la API");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Blog Multicontenedores con Docker</h1>
      <div
        style={{
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Estado del Sistema</h2>
        <p>
          <strong>Frontend:</strong> Estoy bien
        </p>
        <p>
          <strong>Backend:</strong>{" "}
          {mensajeBackend === "Fallo la comunicacion con la API"
            ? "Error"
            : `${mensajeBackend}`}
        </p>
      </div>
    </div>
  );
}

export default App;
