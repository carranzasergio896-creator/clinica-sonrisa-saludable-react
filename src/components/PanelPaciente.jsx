import { useState } from "react";
import { citasDePaciente, cancelarCita } from "../utils/almacenamiento";

export default function PanelPaciente({ usuario, navegar, pedirCita }) {
  const [citas, setCitas] = useState(citasDePaciente(usuario.correo));
  const [aviso, setAviso] = useState("");

  function quitarCita(id) {
    cancelarCita(id);
    setCitas(citasDePaciente(usuario.correo));
    setAviso("La solicitud fue cancelada.");
  }

  return (
    <section className="seccion panel" id="panel">
      <div className="contenedor-panel">
        <div className="titulo-seccion">
          <p className="etiqueta">MI PANEL</p>
          <h2>Hola, {usuario.nombre}</h2>
          <p>
            Estas son las solicitudes de cita registradas con tu correo{" "}
            <strong>{usuario.correo}</strong>.
          </p>
        </div>

        {citas.length === 0 ? (
          <div className="sin-citas">
            <p>Aún no tienes solicitudes de cita registradas.</p>
            <button className="boton-principal" onClick={() => pedirCita(null)}>
              Solicitar mi primera cita
            </button>
          </div>
        ) : (
          <div className="tabla-scroll">
            <table className="tabla-citas">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Dentista</th>
                  <th>Servicio</th>
                  <th>Fecha</th>
                  <th>Horario</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita) => (
                  <tr key={cita.id}>
                    <td>#{cita.id}</td>
                    <td>{cita.dentista}</td>
                    <td>{cita.servicio}</td>
                    <td>{cita.fecha}</td>
                    <td>{cita.horario}</td>
                    <td>
                      <span className="estado-cita">{cita.estado}</span>
                    </td>
                    <td>
                      <button
                        className="boton-cancelar"
                        onClick={() => quitarCita(cita.id)}
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {aviso && <p className="mensaje exito">{aviso}</p>}
        <button className="boton-secundario" onClick={() => pedirCita(null)}>
          Solicitar otra cita
        </button>
        <button className="enlace-texto" onClick={() => navegar("inicio")}>
          Volver al inicio
        </button>
      </div>
    </section>
  );
}
