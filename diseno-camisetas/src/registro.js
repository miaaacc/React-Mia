import { useState } from "react";

function Registro(props) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");

  const manejarRegistro = async (e) => {
    e.preventDefault();
    const datos = { nombre, email, clave };
    try {
      const resp = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const resultado = await resp.json();
      if (resp.ok) {
        alert("Usuario registrado con éxito. Ahora puede iniciar sesión.");
        props.onSwitchToLogin();
      } else {
        alert("Error al registrar: " + (resultado.error || "Datos inválidos"));
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo registrar. Intente más tarde.");
    }
  };

  return (
    <form className="registro-container" onSubmit={manejarRegistro}>
      <h2>Crear Cuenta</h2>
      <label>Nombre completo:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Contraseña:</label>
      <input
        type="password"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
        required
      />
      <button type="submit">Registrarse</button>
      <button type="button" onClick={props.onSwitchToLogin}>
        Ir a Iniciar Sesión
      </button>
    </form>
  );
}
export default Registro;