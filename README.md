# Clínica Dental Sonrisa Saludable (React)

Aplicación web para solicitar citas en la Clínica Dental Sonrisa Saludable, desarrollada con React y Vite como proyecto académico con metodología Scrum.

Autor: Sergio Carranza

## Funcionalidades

- Portada y catálogo de servicios.
- Catálogo de dentistas con especialidad y horarios.
- Solicitud de cita con validaciones (nombre, correo, teléfono, fecha y horario).
- Horarios ocupados ocultos al elegir dentista y fecha.
- Registro e inicio de sesión (simulación local).
- Panel del paciente para consultar y cancelar citas.

## Cómo ejecutar

1. Instalar dependencias: `npm install`
2. Iniciar el servidor de desarrollo: `npm run dev`
3. Abrir `http://localhost:5173`

## Estructura

- `src/components/`: componentes de la interfaz (Header, Hero, Servicios, Dentistas, FormularioCita, Acceso, PanelPaciente, Contacto, Footer y horarios).
- `src/utils/almacenamiento.js`: capa de persistencia local con localStorage, que funciona como sustituto provisional de la API.
- `src/utils/validaciones.js`: validadores compartidos de los formularios de citas y acceso.

## Avance por sprint

| Sprint | Fechas (2026) | Estado |
|---|---|---|
| Sprint 1 | 5 al 16 de octubre | Terminado |
| Sprint 2 | 19 al 30 de octubre | En proceso |
| Sprint Final | 2 al 13 de noviembre | Terminado: validación por campo en formularios, diseño responsivo probado en 375 px y actualización de esta documentación |

## Aviso

Los datos se guardan solo en el navegador (localStorage) y las contraseñas no están cifradas. Usa únicamente datos ficticios. La API y la autenticación del lado del servidor (contraseñas con hash y validación en servidor) quedan como mejora futura, fuera del alcance de este proyecto académico.