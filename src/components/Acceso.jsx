import { useState } from "react";
import { registrarUsuario, iniciarSesion, guardarSesion } from "../utils/almacenamiento";

export default function Acceso({ alIniciar }) {
  const [modo, setModo] = useState("registro");
  const [formulario, setFormulario] = useState({ nombre: "", correo: "", contrasena: "" });
  const [error, setError] = useState("");

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario({ ...formulario, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();
    setError("");
    if (modo === "registro") {
      if (!formulario.nombre.trim()) {
        setError("Escribe tu nombre.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo)) {
        setError("Escribe un correo electrónico válido.");
        return;
      }
      if (formulario.contrasena.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        return;
      }
      const resultado = registrarUsuario(formulario);
      if (!resultado.ok) {
        setError(resultado.error);
        return;
      }
      guardarSesion(resultado.usuario);
      alIniciar(resultado.usuario);
    } else {
      if (!formulario.correo || !formulario.contrasena) {
        setError("Completa correo y contraseña.");
        return;
      }
      const resultado = iniciarSesion(formulario.correo, formulario.contrasena);
      if (!resultado.ok) {
        setError(resultado.error);
        return;
      }
      guardarSesion(resultado.usuario);
      alIniciar(resultado.usuario);
    }
  }

  return (
    <section className="seccion acceso" id="acceso">
      <div className="contenedor-acceso">
        <div className="titulo-seccion">
          <p className="etiqueta">TU CUENTA</p>
          <h2>{modo === "registro" ? "Crea tu cuenta de paciente" : "Inicia sesión"}</h2>
          <p>
            Con tu cuenta puedes consultar el estado de tus solicitudes de cita
            desde tu panel personal.
          </p>
        </div>
        <div className="pestanas">
          <button
            className={"pestana" + (modo === "registro" ? " activa" : "")}
            onClick={() => { setModo("registro"); setError(""); }}
          >
            Registrarme
          </button>
          <button
            className={"pestana" + (modo === "inicio" ? " activa" : "")}
            onClick={() => { setModo("inicio"); setError(""); }}
          >
            Iniciar sesión
          </button>
        </div>
        <form className="formulario-cita formulario-acceso" onSubmit={enviar} noValidate>
          {modo === "registro" && (
            <>
              <label htmlFor="nombre-cuenta">Nombre completo</label>
              <input
                id="nombre-cuenta"
                name="nombre"
                type="text"
                placeholder="Escribe tu nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
              />
            </>
          )}
          <label htmlFor="correo-cuenta">Correo electrónico</label>
          <input
            id="correo-cuenta"
            name="correo"
            type="email"
            placeholder="correo@ejemplo.com"
            value={formulario.correo}
            onChange={manejarCambio}
          />
          <label htmlFor="contrasena-cuenta">Contraseña</label>
          <input
            id="contrasena-cuenta"
            name="contrasena"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={formulario.contrasena}
            onChange={manejarCambio}
          />
          {error && <p className="mensaje error">{error}</p>}
          <button className="boton-enviar" type="submit">
            {modo === "registro" ? "Crear cuenta" : "Entrar"}
          </button>
        </form>
        <p className="nota-seguridad">
          Nota: por ahora las cuentas se guardan en el navegador
          (localStorage) como simulación. La seguridad completa (almacenamiento seguro de contraseñas mediante hash y validación en el servidor) está programada para el Sprint 3.
        </p>
      </div>
    </section>
  );
}
