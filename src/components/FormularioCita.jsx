import { useState } from "react";
import { HORARIOS } from "./horarios";
import { dentistas } from "./Dentistas";
import { horariosOcupados, guardarCita } from "../utils/almacenamiento";
import { validarNombre, validarCorreo, validarTelefono } from "../utils/validaciones";

const servicios = [
  "Limpieza dental",
  "Blanqueamiento dental",
  "Ortodoncia",
  "Endodoncia",
  "Odontología estética",
  "Odontopediatría",
];

export default function FormularioCita({ usuario, navegar, dentistaInicial }) {
  function fechaLocal(fecha) {
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${fecha.getFullYear()}-${mes}-${dia}`;
  }
  const hoy = fechaLocal(new Date());
  const [formulario, setFormulario] = useState({
    nombre: usuario ? usuario.nombre : "",
    telefono: "",
    correo: usuario ? usuario.correo : "",
    dentistaId: dentistaInicial ? String(dentistaInicial.id) : "",
    servicio: "",
    fecha: "",
    horario: "",
  });
  const [errores, setErrores] = useState({});
  const [confirmacion, setConfirmacion] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");

  const dentistaElegido = dentistas.find((d) => String(d.id) === formulario.dentistaId);
  const ocupados = dentistaElegido && formulario.fecha
    ? horariosOcupados(dentistaElegido.id, formulario.fecha)
    : [];
  const horariosDisponibles = HORARIOS.filter((h) => !ocupados.includes(h));

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setErrores({ ...errores, [name]: "" });
    if (name === "dentistaId" || name === "fecha") {
      setFormulario({ ...formulario, [name]: value, horario: "" });
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  }

  function validarFormulario() {
    const nuevosErrores = {
      nombre: validarNombre(formulario.nombre),
      telefono: validarTelefono(formulario.telefono),
      correo: validarCorreo(formulario.correo),
    };
    if (!formulario.dentistaId) {
      nuevosErrores.dentistaId = "Selecciona un dentista.";
    }
    if (!formulario.servicio) {
      nuevosErrores.servicio = "Selecciona un servicio.";
    }
    if (!formulario.fecha) {
      nuevosErrores.fecha = "Elige una fecha.";
    } else if (formulario.fecha < hoy) {
      nuevosErrores.fecha = "No puedes seleccionar una fecha anterior al día actual.";
    }
    if (!formulario.horario) {
      nuevosErrores.horario = "Elige un horario disponible.";
    }
    setErrores(nuevosErrores);
    return Object.values(nuevosErrores).every((error) => error === "");
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    setErrorGeneral("");
    setConfirmacion("");
    if (!validarFormulario()) return;

    const resultado = guardarCita({
      ...formulario,
      dentista: dentistaElegido.nombre,
      dentistaId: dentistaElegido.id,
    });
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    const cita = resultado.cita;
    setConfirmacion(
      `Gracias, ${cita.nombre}. Tu solicitud con ${cita.dentista} quedó registrada con el folio ${cita.id}. Estado: ${cita.estado}.`
    );
    setFormulario({
      nombre: usuario ? usuario.nombre : "",
      telefono: "",
      correo: usuario ? usuario.correo : "",
      dentistaId: dentistaInicial ? String(dentistaInicial.id) : "",
      servicio: "",
      fecha: "",
      horario: "",
    });
    setErrores({});
  }

  return (
    <section className="seccion cita" id="cita">
      <div className="contenedor-cita">
        <div className="texto-cita">
          <p className="etiqueta">SOLICITA TU CITA</p>
          <h2>Agenda una consulta con nosotros</h2>
          <p>
            Elige al dentista, el servicio, la fecha y el horario. Los horarios
            que ya están ocupados no aparecen en la lista. Tu solicitud queda
            guardada con un folio para que puedas darle seguimiento.
          </p>
          <div className="datos-contacto">
            <p>📞 (33) 1234 5678</p>
            <p>✉️ contacto@sonrisasaludable.com</p>
            <p>🕘 Lunes a sábado, 9:00 a 18:00 h</p>
          </div>
        </div>
        <form className="formulario-cita" onSubmit={enviarFormulario} noValidate>
          <div className="fila-formulario">
            <div>
              <label htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Escribe tu nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.nombre)}
                className={errores.nombre ? "campo-invalido" : ""}
              />
              {errores.nombre && <p className="error-campo">{errores.nombre}</p>}
            </div>
            <div>
              <label htmlFor="telefono">Teléfono</label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="10 números"
                maxLength="10"
                value={formulario.telefono}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.telefono)}
                className={errores.telefono ? "campo-invalido" : ""}
              />
              {errores.telefono && <p className="error-campo">{errores.telefono}</p>}
            </div>
          </div>
          <div className="fila-formulario">
            <div>
              <label htmlFor="correo">Correo electrónico</label>
              <input
                id="correo"
                name="correo"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formulario.correo}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.correo)}
                className={errores.correo ? "campo-invalido" : ""}
              />
              {errores.correo && <p className="error-campo">{errores.correo}</p>}
            </div>
            <div>
              <label htmlFor="dentistaId">Dentista</label>
              <select
                id="dentistaId"
                name="dentistaId"
                value={formulario.dentistaId}
                onChange={manejarCambio}
                className={errores.dentistaId ? "campo-invalido" : ""}
              >
                <option value="">Selecciona un dentista</option>
                {dentistas.map((dentista) => (
                  <option key={dentista.id} value={String(dentista.id)}>
                    {dentista.nombre}
                  </option>
                ))}
              </select>
              {errores.dentistaId && <p className="error-campo">{errores.dentistaId}</p>}
            </div>
          </div>
          <div className="fila-formulario">
            <div>
              <label htmlFor="servicio">Servicio de interés</label>
              <select
                id="servicio"
                name="servicio"
                value={formulario.servicio}
                onChange={manejarCambio}
                className={errores.servicio ? "campo-invalido" : ""}
              >
                <option value="">Selecciona un servicio</option>
                {servicios.map((servicio) => (
                  <option key={servicio} value={servicio}>
                    {servicio}
                  </option>
                ))}
              </select>
              {errores.servicio && <p className="error-campo">{errores.servicio}</p>}
            </div>
            <div>
              <label htmlFor="fecha">Fecha preferida</label>
              <input
                id="fecha"
                name="fecha"
                type="date"
                min={hoy}
                value={formulario.fecha}
                onChange={manejarCambio}
                aria-invalid={Boolean(errores.fecha)}
                className={errores.fecha ? "campo-invalido" : ""}
              />
              {errores.fecha && <p className="error-campo">{errores.fecha}</p>}
            </div>
          </div>
          <label htmlFor="horario">Horario</label>
          <select
            id="horario"
            name="horario"
            value={formulario.horario}
            onChange={manejarCambio}
            disabled={!dentistaElegido || !formulario.fecha}
            className={errores.horario ? "campo-invalido" : ""}
          >
            <option value="">
              {!dentistaElegido || !formulario.fecha
                ? "Selecciona dentista y fecha"
                : "Selecciona un horario"}
            </option>
            {horariosDisponibles.map((horario) => (
              <option key={horario} value={horario}>
                {horario}
              </option>
            ))}
          </select>
          {errores.horario && <p className="error-campo">{errores.horario}</p>}
          {errorGeneral && <p className="mensaje error">{errorGeneral}</p>}
          {confirmacion && <p className="mensaje exito">{confirmacion}</p>}
          <button className="boton-enviar" type="submit">
            Enviar solicitud
          </button>
          {!usuario && (
            <p className="ayuda-cuenta">
              ¿Quieres dar seguimiento a tus citas?{" "}
              <button className="enlace-texto" onClick={() => navegar("acceso")}>
                Crea tu cuenta o inicia sesión
              </button>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
