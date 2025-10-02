import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    const datos = { email: email, clave: clave };
    try {
      const resp = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const resultado = await resp.json();
      if (resp.ok) {
        const tokenRecibido = resultado.token;
        props.onLoginSuccess(tokenRecibido);
      } else {
        alert("Error de credenciales: " + resultado.error);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Ocurrió un error al conectar con el servidor");
    }
  };

  return (
    <form className="login-container" onSubmit={manejarSubmit}>
      <h2>Iniciar Sesión</h2>
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
      <button type="submit">Ingresar</button>
      <button type="button" onClick={props.onSwitchToRegister}>
        Crear una cuenta
      </button>
    </form>
  );
}
export default Login;