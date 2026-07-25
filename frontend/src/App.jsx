import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Cargando posts...");

  // Función para obtener los posts al cargar la página
  const fetchPosts = () => {
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setStatus("Conexión con Base de datos establecida");
      })
      .catch((err) => {
        console.error("Error:", err);
        setStatus("Error de conexión");
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Función para guardar un nuevo post
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página recargue al enviar el formulario

    if (!title || !content) return alert("Por favor, llena todos los campos");

    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }), // Convierte el formulario a JSON
    })
      .then((res) => res.json())
      .then((newPost) => {
        setPosts([newPost, ...posts]); // Agrega el nuevo post al inicio de la lista
        setTitle(""); // Limpia el campo título
        setContent(""); // Limpia el campo texto
      })
      .catch((err) => console.error("Error al guardar:", err));
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* 1. Encabezado y Estado del Sistema */}
      <div style={{ marginBottom: "3rem", textAlign: "center" }}>
        <h1
          style={{ color: "#2c3e50", marginBottom: "1rem", fontSize: "2.5rem" }}
        >
          El Blog del Docker
        </h1>
        <p
          style={{
            color: "#0d1216",
            padding: "0.8rem 1.5rem",
            borderTop: "1px solid #cce",
            borderbottom: "1px solid #cce",
          }}
        >
          <strong>Realizado por:</strong> Jessica Ramires y Enderson Chavez
          <br />
          <strong>Comunicaciones II</strong>
          <br />
          <strong>Semestre 2026-1</strong>
        </p>
      </div>

      {/* 2. Formulario de Entrada (Con más espacio y sombras) */}
      <div
        style={{
          padding: "2.5rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "12px",
          marginBottom: "4rem",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{
            borderBottom: "2px solid #007bff",
            paddingBottom: "0.5rem",
            marginBottom: "2rem",
            color: "#333",
          }}
        >
          Crear Nueva Entrada
        </h2>

        {/* Aumentamos el 'gap' para separar los inputs */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <input
            type="text"
            placeholder="Título de la entrada..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "1rem",
              fontSize: "1.1rem",
              borderRadius: "12px",
              border: "1px solid #ccc",
            }}
          />
          <textarea
            placeholder="Escribe el contenido del blog aquí..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            style={{
              padding: "1rem",
              fontSize: "1.1rem",
              borderRadius: "12px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "1rem",
              fontSize: "1.1rem",
              fontWeight: "bold",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            Publicar Entrada
          </button>
        </form>
      </div>

      {/* 3. Lista de Entradas Publicadas */}
      <div>
        <h2
          style={{
            borderBottom: "2px solid #28a745",
            paddingBottom: "0.5rem",
            marginBottom: "2rem",
            color: "#333",
          }}
        >
          Últimas Publicaciones
        </h2>

        {posts.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#777",
              fontStyle: "italic",
              marginTop: "2rem",
            }}
          >
            No hay entradas en la base de datos todavía. ¡Sé el primero en
            escribir!
          </p>
        ) : (
          posts.map((post) => (
            /* Tarjeta individual para cada post con separación amplia */
            <div
              key={post.id}
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "12px",
                marginBottom: "2.5rem",
                border: "1px solid #eaeaea",
                boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 1rem 0",
                  color: "#222",
                  fontSize: "1.6rem",
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  margin: "0 0 1.5rem 0",
                  lineHeight: "1.7",
                  color: "#555",
                  fontSize: "1.05rem",
                }}
              >
                {post.content}
              </p>

              <div
                style={{
                  borderTop: "1px solid #eee",
                  paddingTop: "1rem",
                  textAlign: "right",
                }}
              >
                <small style={{ color: "#888", fontWeight: "500" }}>
                  Publicado el: {new Date(post.created_at).toLocaleString()}
                </small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
