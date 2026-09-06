import { useState } from "react";
import "./App.css";

function App() {
    const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    servicio: "",
    fecha: "",
    horario: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const fechaMinima = new Date().toISOString().split("T")[0];

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  }

  function enviarFormulario(evento) {
    evento.preventDefault();

    if (
      !formulario.nombre ||
      !formulario.telefono ||
      !formulario.correo ||
      !formulario.servicio ||
      !formulario.fecha ||
      !formulario.horario
    ) {
      setError("Completa todos los campos obligatorios.");
      setMensaje("");
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoValido.test(formulario.correo)) {
      setError("Escribe un correo electrónico válido.");
      setMensaje("");
      return;
    }

    const telefonoValido = /^[0-9]{10}$/;

    if (!telefonoValido.test(formulario.telefono)) {
      setError("El teléfono debe tener exactamente 10 números.");
      setMensaje("");
      return;
    }

    if (formulario.fecha < fechaMinima) {
      setError("No puedes seleccionar una fecha anterior al día actual.");
      setMensaje("");
      return;
    }

    setError("");
    setMensaje(
      `Gracias, ${formulario.nombre}. Tu solicitud para ${formulario.servicio} fue enviada correctamente.`
    );

    setFormulario({
      nombre: "",
      telefono: "",
      correo: "",
      servicio: "",
      fecha: "",
      horario: "",
    });
  }
  
  const servicios = [
    {
      icono: "🦷",
      nombre: "Limpieza dental",
      descripcion:
        "Eliminación de placa y sarro para mantener una sonrisa limpia y saludable.",
    },
    {
      icono: "😁",
      nombre: "Blanqueamiento dental",
      descripcion:
        "Tratamiento estético para mejorar el tono y la apariencia de los dientes.",
    },
    {
      icono: "🪥",
      nombre: "Ortodoncia",
      descripcion:
        "Corrección de la posición de los dientes mediante brackets o alineadores.",
    },
    {
      icono: "🦷",
      nombre: "Endodoncia",
      descripcion:
        "Tratamiento para eliminar infecciones internas y conservar la pieza dental.",
    },
    {
      icono: "✨",
      nombre: "Odontología estética",
      descripcion:
        "Procedimientos para mejorar la armonía, forma y apariencia de tu sonrisa.",
    },
    {
      icono: "👶",
      nombre: "Odontopediatría",
      descripcion:
        "Atención dental especializada para niñas, niños y adolescentes.",
    },
  ];

  return (
    <div className="app">
      <header className="encabezado">
        <nav className="navegacion">
          <a href="#inicio" className="logo">
            Sonrisa <span>Saludable</span>
          </a>

          <div className="enlaces">
            <a href="#inicio">Inicio</a>
            <a href="#servicios">Servicios</a>
            <a href="#cita">Cita</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-texto">
            <p className="etiqueta">CLÍNICA DENTAL</p>
            <h1>Tu sonrisa merece la mejor atención.</h1>
            <p>
              En Sonrisa Saludable ofrecemos atención dental profesional,
              cercana y pensada para cuidar de ti y de tu familia.
            </p>
            <a className="boton-principal" href="#servicios">
              Conoce nuestros servicios
            </a>
          </div>

          <div className="hero-icono" aria-label="Diente decorativo">
            🦷
          </div>
        </section>

        <section className="seccion servicios" id="servicios">
          <div className="titulo-seccion">
            <p className="etiqueta">NUESTROS SERVICIOS</p>
            <h2>Tratamientos para cuidar tu salud bucal</h2>
            <p>
              Conoce algunos de los servicios que ofrecemos para mantener tu
              sonrisa sana y segura.
            </p>
          </div>

          <div className="rejilla-servicios">
            {servicios.map((servicio) => (
              <article className="tarjeta-servicio" key={servicio.nombre}>
                <div className="icono-servicio">{servicio.icono}</div>
                <h3>{servicio.nombre}</h3>
                <p>{servicio.descripcion}</p>
              </article>
            ))}
          </div>
        </section>
                <section className="seccion cita" id="cita">
          <div className="contenedor-cita">
            <div className="texto-cita">
              <p className="etiqueta">SOLICITA TU CITA</p>
              <h2>Agenda una consulta con nosotros</h2>
              <p>
                Completa el formulario y nos pondremos en contacto contigo para
                confirmar la disponibilidad del horario solicitado.
              </p>

              <div className="datos-contacto">
                <p>📞 (33) 1234 5678</p>
                <p>✉️ contacto@sonrisasaludable.com</p>
                <p>🕘 Lunes a sábado, 9:00 a 18:00 h</p>
              </div>
            </div>

            <form
              className="formulario-cita"
              onSubmit={enviarFormulario}
              noValidate
            >
              <label htmlFor="nombre">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                placeholder="Escribe tu nombre"
              />

              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formulario.telefono}
                onChange={manejarCambio}
                placeholder="10 números"
                maxLength="10"
              />

              <label htmlFor="correo">Correo electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formulario.correo}
                onChange={manejarCambio}
                placeholder="correo@ejemplo.com"
              />

              <label htmlFor="servicio">Servicio de interés</label>
              <select
                id="servicio"
                name="servicio"
                value={formulario.servicio}
                onChange={manejarCambio}
              >
                <option value="">Selecciona un servicio</option>
                {servicios.map((servicio) => (
                  <option key={servicio.nombre} value={servicio.nombre}>
                    {servicio.nombre}
                  </option>
                ))}
              </select>

              <div className="fila-formulario">
                <div>
                  <label htmlFor="fecha">Fecha preferida</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    min={fechaMinima}
                    value={formulario.fecha}
                    onChange={manejarCambio}
                  />
                </div>

                <div>
                  <label htmlFor="horario">Horario</label>
                  <select
                    id="horario"
                    name="horario"
                    value={formulario.horario}
                    onChange={manejarCambio}
                  >
                    <option value="">Selecciona</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </div>
              </div>

              {error && <p className="mensaje error">{error}</p>}

              {mensaje && <p className="mensaje exito">{mensaje}</p>}

              <button type="submit" className="boton-enviar">
                Enviar solicitud
              </button>
            </form>
          </div>
        </section>
      </main>
      <section className="contacto" id="contacto">
        <div className="contenido-contacto">
          <div>
            <p className="etiqueta">CONTÁCTANOS</p>
            <h2>Estamos listos para atenderte</h2>
            <p>
              Visítanos o comunícate con nuestro equipo para resolver tus dudas
              y cuidar tu salud bucal.
            </p>
          </div>

          <div className="tarjeta-contacto">
            <p><strong>📍 Dirección:</strong> Av. Salud 123, Guadalajara, Jalisco</p>
            <p><strong>📞 Teléfono:</strong> (33) 1234 5678</p>
            <p><strong>✉️ Correo:</strong> contacto@sonrisasaludable.com</p>
          </div>
        </div>
      </section>
      <footer className="pie-pagina">
        <p>© 2026 Clínica Dental Sonrisa Saludable.</p>
      </footer>
    </div>
  );
}

export default App;