import { useEffect, useRef, useState } from "react";

const opciones = [
  { id: "actividades", texto: "Actividades realizadas en el curso" },
  { id: "sistema", texto: "Sistema implementado" },
  { id: "codigo", texto: "Código fuente (comprimido)" },
  { id: "reporte", texto: "Reporte de las modificaciones" },
];

export default function MenuProyecto({ abrirSeccion }) {
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef(null);

  useEffect(() => {
    function cerrarFuera(evento) {
      if (contenedor.current && !contenedor.current.contains(evento.target)) {
        setAbierto(false);
      }
    }
    function cerrarConEscape(evento) {
      if (evento.key === "Escape") setAbierto(false);
    }
    document.addEventListener("mousedown", cerrarFuera);
    document.addEventListener("keydown", cerrarConEscape);
    return () => {
      document.removeEventListener("mousedown", cerrarFuera);
      document.removeEventListener("keydown", cerrarConEscape);
    };
  }, []);

  function elegir(id) {
    setAbierto(false);
    abrirSeccion(id);
  }

  return (
    <div className="menu-proyecto" ref={contenedor}>
      <button
        className="boton-menu"
        aria-haspopup="true"
        aria-expanded={abierto}
        onClick={() => setAbierto(!abierto)}
      >
        <span className="icono-menu" aria-hidden="true">☰</span> Menú
      </button>
      {abierto && (
        <ul className="lista-menu" role="menu">
          {opciones.map((opcion, i) => (
            <li key={opcion.id} role="none">
              <button role="menuitem" onClick={() => elegir(opcion.id)}>
                <span className="numero-menu">{i + 1}</span>
                {opcion.texto}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
