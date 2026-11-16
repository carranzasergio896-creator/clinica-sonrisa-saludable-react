import { actividades, modificaciones, REPOSITORIO, ZIP_CODIGO } from "../data/entregaFinal";

const pestanas = [
  { id: "actividades", texto: "Actividades" },
  { id: "sistema", texto: "Sistema" },
  { id: "codigo", texto: "Código fuente" },
  { id: "reporte", texto: "Modificaciones" },
];

export default function EntregaFinal({ seccion, cambiarSeccion, navegar }) {
  return (
    <main className="seccion entrega-final">
      <div className="titulo-seccion">
        <p className="etiqueta">ENTREGA FINAL · PROYECTO II</p>
        <h2>Menú del proyecto</h2>
        <p>Documentación y producto terminado del sistema de citas Sonrisa Saludable.</p>
      </div>

      <div className="pestanas-entrega">
        {pestanas.map((p) => (
          <button
            key={p.id}
            className={"pestana" + (seccion === p.id ? " activa" : "")}
            onClick={() => cambiarSeccion(p.id)}
          >
            {p.texto}
          </button>
        ))}
      </div>

      <div className="contenido-entrega">
        {seccion === "actividades" && (
          <>
            <h3>Actividades realizadas en el curso</h3>
            <ol className="linea-tiempo">
              {actividades.map((a) => (
                <li key={a.titulo}>
                  <span className="fecha-actividad">{a.fecha}</span>
                  <strong>{a.titulo}</strong>
                  <p>{a.detalle}</p>
                </li>
              ))}
            </ol>
          </>
        )}

        {seccion === "sistema" && (
          <>
            <h3>Sistema implementado</h3>
            <p>
              Aplicación web en React y Vite para que los pacientes de la Clínica Dental
              Sonrisa Saludable consulten servicios y dentistas y soliciten citas en línea.
            </p>
            <ul className="lista-funciones">
              <li>Portada y catálogo de servicios dentales.</li>
              <li>Catálogo de dentistas con especialidad y horarios.</li>
              <li>Solicitud de cita con validación por campo y horarios ocupados ocultos.</li>
              <li>Registro e inicio de sesión (simulación local).</li>
              <li>Panel del paciente para consultar y cancelar citas.</li>
              <li>Diseño responsivo probado en 375 px.</li>
            </ul>
            <div className="acciones-entrega">
              <button className="boton-principal" onClick={() => navegar("inicio")}>
                Abrir el sistema
              </button>
              <button className="boton-secundario" onClick={() => navegar("cita")}>
                Probar solicitud de cita
              </button>
            </div>
          </>
        )}

        {seccion === "codigo" && (
          <>
            <h3>Código fuente (comprimido)</h3>
            <p>
              Descarga el proyecto completo en un archivo ZIP generado desde la rama
              principal del repositorio.
            </p>
            <div className="acciones-entrega">
              <a className="boton-principal" href={ZIP_CODIGO}>
                Descargar código (.zip)
              </a>
              <a className="boton-secundario" href={REPOSITORIO} target="_blank" rel="noreferrer">
                Ver repositorio en GitHub
              </a>
            </div>
            <p className="nota-entrega">
              Para ejecutarlo: <code>npm install</code> y después <code>npm run dev</code>.
            </p>
          </>
        )}

        {seccion === "reporte" && (
          <>
            <h3>Reporte de las modificaciones realizadas</h3>
            <div className="tabla-scroll">
              <table className="tabla-entrega">
                <thead>
                  <tr>
                    <th>Commit</th>
                    <th>Fecha</th>
                    <th>Modificación</th>
                    <th>Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {modificaciones.map((m) => (
                    <tr key={m.commit}>
                      <td><code>{m.commit}</code></td>
                      <td>{m.fecha}</td>
                      <td>{m.cambio}</td>
                      <td>{m.detalle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="nota-entrega">
              Fuera de alcance (mejora futura): API y autenticación del lado del servidor.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
