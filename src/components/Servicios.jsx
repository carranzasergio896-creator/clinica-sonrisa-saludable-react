const servicios = [
  {
    icono: "🦷",
    nombre: "Limpieza dental",
    descripcion: "Eliminación de placa y sarro para mantener una sonrisa limpia y saludable.",
  },
  {
    icono: "😁",
    nombre: "Blanqueamiento dental",
    descripcion: "Tratamiento estético para mejorar el tono y la apariencia de los dientes.",
  },
  {
    icono: "🪥",
    nombre: "Ortodoncia",
    descripcion: "Corrección de la posición de los dientes mediante brackets o alineadores.",
  },
  {
    icono: "🦷",
    nombre: "Endodoncia",
    descripcion: "Tratamiento para eliminar infecciones internas y conservar la pieza dental.",
  },
  {
    icono: "✨",
    nombre: "Odontología estética",
    descripcion: "Procedimientos para mejorar la armonía, forma y apariencia de tu sonrisa.",
  },
  {
    icono: "👶",
    nombre: "Odontopediatría",
    descripcion: "Atención dental especializada para niñas, niños y adolescentes.",
  },
];

export default function Servicios() {
  return (
    <section className="seccion servicios" id="servicios">
      <div className="titulo-seccion">
        <p className="etiqueta">NUESTROS SERVICIOS</p>
        <h2>Tratamientos para cuidar tu salud bucal</h2>
        <p>
          Conoce algunos de los servicios que ofrecemos para mantener tu sonrisa
          sana y segura.
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
  );
}
