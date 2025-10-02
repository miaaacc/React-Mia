import { useState } from "react";

function ListaPeliculas(props) {
  const [peliculas, setPeliculas] = useState([]);

  const manejarCargarPeliculas = async () => {
    try {
      const resp = await fetch("http://localhost:3000/api/peliculas");
      const data = await resp.json();
      if (resp.ok) {
        setPeliculas(data);
        if (props.onPeliculasCargadas) props.onPeliculasCargadas(data);
      } else {
        alert("Error al obtener las películas");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Ocurrió un error al conectar con el servidor");
    }
  };

  return (
    <div>
      <h2>Lista de Películas</h2>
      <button onClick={manejarCargarPeliculas}>Cargar Películas</button>
      {peliculas.map((p) => (
        <div key={p._id || p.id} className="pelicula">
          <h2>{p.titulo}</h2>
          <p>{p.descripcion}</p>
          <p>⭐ {p.calificacion}</p>
          {p.imagen && <img src={p.imagen} alt={p.titulo} />}
        </div>
      ))}
    </div>
  );
}

export default ListaPeliculas;
