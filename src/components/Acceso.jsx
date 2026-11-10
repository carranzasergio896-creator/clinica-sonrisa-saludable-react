import { useState } from "react";
import { registrarUsuario, iniciarSesion, guardarSesion } from "../utils/almacenamiento";
import { validarNombre, validarCorreo, validarContrasena } from "../utils/validaciones";

export default function Acceso({ alIniciar }) {
  const [modo, setModo] = useState("registro");
  const [formulario, setFormulario] = useState({ nombre: "", correo: "", contrasena: "" });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setErrores({ ...errores, [name]: "" });
    setFormulario({ ...formulario, [name]: value });
  }

  function validarFormulario() {
    const nuevosErrores = { correo: validarCorreo(formulario.correo) };
    if (modo === "registro") {
      nuevosErrores.nombre = validarNombre(formulario.nombre);
      nuevosErrores.contrasena = validarContrasena(formulario.contrasena);
    } else if (!formulario.contrasena) {
      nuevosErrores.contrasena = "Escribe tu contraseña.";
    }
    setErrores(nuevosErrores);
    return Object.values(nuevosErrores).every((error) => error === "");
  }

  function enviar(evento) {
    evento.preventDefault();
    setErrorGeneral("");
    if (!validarFormulario()) return;
    if (modo === "registro") {
      const resultado = registrarUsuario(formulario);
      if (!resultado.ok) {
        setErrorGeneral(resultado.error);
        return;
      }
      guardarSesion(resultado.usuario);
      alIniciar(resultado.usuario);
    } else {
      const resultado = iniciarSesion(formulario.correo, formulario.contrasena);
      if (!resultado.ok) {
        setErrorGeneral(resultado.error);
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
            onClick={() => { setModo("registro"); setErrores({}); setErrorGeneral(""); }}
          >
            Registrarme
          </button>
          <button
            className={"pestana" + (modo === "inicio" ? " activa" : "")}
            onClick={() => { setModo("inicio"); setErrores({}); setErrorGeneral(""); }}
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
                aria-invalid={Boolean(errores.nombre)}
                className={errores.nombre ? "campo-invalido" : ""}
              />
              {errores.nombre && <p className="error-campo">{errores.nombre}</p>}
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
            aria-invalid={Boolean(errores.correo)}
            className={errores.correo ? "campo-invalido" : ""}
          />
          {errores.correo && <p className="error-campo">{errores.correo}</p>}
          <label htmlFor="contrasena-cuenta">Contraseña</label>
          <input
            id="contrasena-cuenta"
            name="contrasena"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={formulario.contrasena}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.contrasena)}
            className={errores.contrasena ? "campo-invalido" : ""}
          />
          {errores.contrasena && <p className="error-campo">{errores.contrasena}</p>}
          {errorGeneral && <p className="mensaje error">{errorGeneral}</p>}
          <button className="boton-enviar" type="submit">
            {modo === "registro" ? "Crear cuenta" : "Entrar"}
          </button>
        </form>
        <p className="nota-seguridad">
          Nota: por ahora las cuentas se guardan en el navegador
          (localStorage) como simulación. El almacenamiento seguro de contraseñas
          mediante hash y la validación en el servidor quedan como mejora futura,
          fuera del alcance de este proyecto académico.
        </p>
      </div>
    </section>
  );
}
