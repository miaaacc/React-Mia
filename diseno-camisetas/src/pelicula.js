import { useState } from "react";

function FormPeliculas(props) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [imagen, setImagen] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      titulo,
      descripcion,
      calificacion: parseInt(calificacion),
      imagen,
    };
    try {
      const resp = await fetch("http://localhost:3000/api/peliculas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const resultado = await resp.json();
      if (resp.ok) {
        alert(resultado.msg || "Película registrada con éxito ✅");
        setTitulo("");
        setDescripcion("");
        setCalificacion("");
        setImagen("");
        if (props.onPeliculaEnviada) props.onPeliculaEnviada(resultado);
      } else {
        alert("Error: " + (resultado.error || "No se pudo registrar la película"));
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Ocurrió un error al conectar con el servidor");
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>Registrar Película</h2>
      <label>Título:</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <label>Descripción:</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      ></textarea>
      <label>Calificación:</label>
      <input
        type="number"
        value={calificacion}
        onChange={(e) => setCalificacion(e.target.value)}
        required
      />
      <label>URL de la imagen:</label>
      <input
        type="text"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        required
      />
      <button type="submit">Guardar Película</button>
    </form>
  );
}

export default FormPeliculas;
