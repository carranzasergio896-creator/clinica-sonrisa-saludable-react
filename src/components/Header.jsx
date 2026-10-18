export default function Header({ vista, navegar, usuario, salir }) {
  return (
    <header className="encabezado">
      <nav className="navegacion">
        <button className="logo-boton" onClick={() => navegar("inicio")}>
          <span className="logo">Sonrisa <span>Saludable</span></span>
        </button>
        <div className="enlaces">
          <button
            className={"boton-nav" + (vista === "inicio" ? " activo" : "")}
            onClick={() => navegar("inicio")}
          >
            Inicio
          </button>
          <button className="boton-nav" onClick={() => navegar("inicio", "servicios")}>
            Servicios
          </button>
          <button
            className={"boton-nav" + (vista === "dentistas" ? " activo" : "")}
            onClick={() => navegar("dentistas")}
          >
            Dentistas
          </button>
          <button
            className={"boton-nav" + (vista === "cita" ? " activo" : "")}
            onClick={() => navegar("cita")}
          >
            Solicitar cita
          </button>
          {usuario ? (
            <>
              <button
                className={"boton-nav" + (vista === "panel" ? " activo" : "")}
                onClick={() => navegar("panel")}
              >
                Mi panel
              </button>
              <button className="boton-nav" onClick={salir}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              className={"boton-nav" + (vista === "acceso" ? " activo" : "")}
              onClick={() => navegar("acceso")}
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
