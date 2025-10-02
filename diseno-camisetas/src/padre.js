import { useState } from "react";
import Login from "./login";
import Registro from "./registro";
import FormPeliculas from "./pelicula";
import ListaPeliculas from "./calificaciones";
import "./App.css";

function App() {
  const [vistaActual, setVistaActual] = useState("login");
  const [token, setToken] = useState(null);

  const manejarLoginExitoso = (tokenRecibido) => {
    setToken(tokenRecibido);
    setVistaActual("peliculas");
  };

  const manejarLogout = () => {
    setToken(null);
    setVistaActual("login");
  };

  const irARegistro = () => setVistaActual("registro");
  const irALogin = () => setVistaActual("login");

  return (
    <div className="contenedor">
      {vistaActual === "login" && (
        <Login
          onLoginSuccess={manejarLoginExitoso}
          onSwitchToRegister={irARegistro}
        />
      )}
      {vistaActual === "registro" && <Registro onSwitchToLogin={irALogin} />}
      {vistaActual === "peliculas" && (
        <>
          <h1>Panel de Películas</h1>
          <button onClick={manejarLogout}>Cerrar Sesión</button>
          <FormPeliculas />
          <ListaPeliculas />
        </>
      )}
    </div>
  );
}

export default App;
