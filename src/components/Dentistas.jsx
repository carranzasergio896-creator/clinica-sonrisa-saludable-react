import { HORARIOS } from "./horarios";

export const dentistas = [
  {
    id: 1,
    nombre: "Dra. Ana Martínez López",
    especialidad: "Odontología general y limpieza dental",
    perfil:
      "Egresada de la UdeG con 12 años de experiencia en limpieza, revisiones y prevención.",
  },
  {
    id: 2,
    nombre: "Dr. Carlos Ramírez Vega",
    especialidad: "Ortodoncia",
    perfil:
      "Especialista en brackets y alineadores para niños, niñas y adultos.",
  },
  {
    id: 3,
    nombre: "Dra. Sofía Herrera Ruiz",
    especialidad: "Odontología estética y blanqueamiento",
    perfil:
      "Se dedica a blanqueamientos, carillas y diseño de sonrisa con materiales seguros.",
  },
  {
    id: 4,
    nombre: "Dr. Luis Gómez Ortega",
    especialidad: "Endodoncia y odontopediatría",
    perfil:
      "Atiende infecciones internas y cuida la salud dental de los más pequeños.",
  },
];

export default function Dentistas({ pedirCita }) {
  return (
    <section className="seccion" id="dentistas">
      <div className="titulo-seccion">
        <p className="etiqueta">NUESTRO EQUIPO</p>
        <h2>Dentistas y horarios disponibles</h2>
        <p>
          Elige al dentista que necesitas. Solo se muestran los horarios que
          siguen libres en la fecha que selecciones al solicitar tu cita.
        </p>
      </div>
      <div className="rejilla-servicios">
        {dentistas.map((dentista) => (
          <article className="tarjeta-servicio" key={dentista.id}>
            <div className="icono-servicio">🧑‍⚕️</div>
            <h3>{dentista.nombre}</h3>
            <p className="especialidad">{dentista.especialidad}</p>
            <p>{dentista.perfil}</p>
            <p className="horarios-texto">Horarios: {HORARIOS.join(", ")}</p>
            <button className="boton-principal" onClick={() => pedirCita(dentista)}>
              Agendar con este dentista
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
