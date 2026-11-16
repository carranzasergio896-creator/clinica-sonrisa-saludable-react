export const REPOSITORIO =
  "https://github.com/carranzasergio896-creator/clinica-sonrisa-saludable-react";
export const ZIP_CODIGO = REPOSITORIO + "/archive/refs/heads/main.zip";

export const actividades = [
  {
    fecha: "Agosto 2026",
    titulo: "Requerimientos y Product Backlog",
    detalle:
      "Planteamiento del sistema web de citas, historias de usuario priorizadas y tablero de tareas (Por hacer, En proceso, Hecho).",
  },
  {
    fecha: "Septiembre 2026",
    titulo: "Sprint 1 en React y repositorio en GitHub",
    detalle:
      "Creación del proyecto con React y Vite, catálogo de servicios y formulario de solicitud de cita. Primer commit publicado.",
  },
  {
    fecha: "Septiembre 2026",
    titulo: "Priorización de requisitos y calendarización",
    detalle:
      "Requerimientos con enfoque PMI, calendarización de sprints y Sprint Schedule de cada iteración.",
  },
  {
    fecha: "Octubre 2026",
    titulo: "Primer y segundo progreso de los Sprints",
    detalle:
      "Registro e inicio de sesión simulados, catálogo de dentistas, horarios disponibles y panel del paciente.",
  },
  {
    fecha: "Octubre 2026",
    titulo: "Tercer progreso y reporte de la unidad",
    detalle:
      "Pruebas en escritorio y en vista móvil de 375 px, documentación de resultados y metas pendientes.",
  },
  {
    fecha: "Noviembre 2026",
    titulo: "Bitácora de revisión y modificaciones",
    detalle:
      "Revisión en equipo de los proyectos, propuestas de mejora, roles y aplicación de los cambios del Sprint Final.",
  },
  {
    fecha: "Noviembre 2026",
    titulo: "Entrega final",
    detalle:
      "Menú del proyecto con actividades, sistema, código fuente comprimido y reporte de modificaciones.",
  },
];

export const modificaciones = [
  {
    commit: "8720417",
    fecha: "09/11/2026",
    cambio: "Validación de formularios de citas y registro",
    detalle:
      "Se creó src/utils/validaciones.js; cada campo muestra su propio mensaje de error (nombre, correo, teléfono, fecha y horario).",
  },
  {
    commit: "aa934f8",
    fecha: "10/11/2026",
    cambio: "Ajustes responsivos para móviles (375 px)",
    detalle:
      "Media query de 480 px para encabezado, portada, tarjetas, formularios y pie de página.",
  },
  {
    commit: "49e75fe",
    fecha: "11/11/2026",
    cambio: "README actualizado",
    detalle:
      "Avance del Sprint Final, instrucciones de ejecución y API/autenticación en servidor como mejora futura.",
  },
  {
    commit: "Entrega final",
    fecha: "16/11/2026",
    cambio: "Botón de Menú del proyecto",
    detalle:
      "Nuevo botón Menú en el encabezado con cuatro opciones: actividades del curso, sistema implementado, código fuente (ZIP) y reporte de modificaciones.",
  },
];
