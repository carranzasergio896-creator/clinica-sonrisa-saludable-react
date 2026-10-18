// Sprint 2 (T-01): capa de persistencia con localStorage.
// Simula la API mientras el backend real se desarrolla en el Sprint 3.

const CLAVE_CITAS = "sonrisa-citas";
const CLAVE_USUARIOS = "sonrisa-usuarios";
const CLAVE_SESION = "sonrisa-sesion";

function leer(clave, valorPorDefecto) {
  try {
    const datos = JSON.parse(localStorage.getItem(clave));
    return datos ?? valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
}

// ---------- Citas ----------

export function leerCitas() {
  return leer(CLAVE_CITAS, []);
}

function fechaLocal(fecha) {
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

export function guardarCita(cita) {
  const citas = leerCitas();
  // Se vuelve a comprobar el horario justo antes de guardar, para evitar
  // que dos navegadores tomen el mismo espacio.
  const ocupados = horariosOcupados(cita.dentistaId, cita.fecha);
  if (ocupados.includes(cita.horario)) {
    return { ok: false, error: "Ese horario acaba de ocuparse. Elige otro horario disponible." };
  }
  const nuevaCita = {
    ...cita,
    id: Date.now(),
    estado: "Pendiente de confirmación",
    fechaRegistro: fechaLocal(new Date()),
  };
  citas.push(nuevaCita);
  localStorage.setItem(CLAVE_CITAS, JSON.stringify(citas));
  return { ok: true, cita: nuevaCita };
}

export function cancelarCita(id) {
  const citas = leerCitas().filter((cita) => cita.id !== id);
  localStorage.setItem(CLAVE_CITAS, JSON.stringify(citas));
}

export function citasDePaciente(correo) {
  return leerCitas().filter((cita) => cita.correo.toLowerCase() === correo.toLowerCase());
}

export function horariosOcupados(dentistaId, fecha) {
  return leerCitas()
    .filter((cita) => cita.dentistaId === dentistaId && cita.fecha === fecha)
    .map((cita) => cita.horario);
}

// ---------- Usuarios y sesión ----------

export function leerUsuarios() {
  return leer(CLAVE_USUARIOS, []);
}

export function registrarUsuario({ nombre, correo, contrasena }) {
  const usuarios = leerUsuarios();
  const yaExiste = usuarios.some(
    (usuario) => usuario.correo.toLowerCase() === correo.toLowerCase()
  );
  if (yaExiste) return { ok: false, error: "Ese correo ya tiene una cuenta. Inicia sesión." };
  usuarios.push({ nombre, correo, contrasena });
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
  return { ok: true, usuario: { nombre, correo } };
}

export function iniciarSesion(correo, contrasena) {
  const usuario = leerUsuarios().find(
    (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.contrasena === contrasena
  );
  if (!usuario) return { ok: false, error: "Correo o contraseña incorrectos." };
  return { ok: true, usuario: { nombre: usuario.nombre, correo: usuario.correo } };
}

export function guardarSesion(usuario) {
  localStorage.setItem(CLAVE_SESION, JSON.stringify({ correo: usuario.correo }));
}

export function leerSesion() {
  const sesion = leer(CLAVE_SESION, null);
  if (!sesion) return null;
  const usuario = leerUsuarios().find(
    (u) => u.correo.toLowerCase() === sesion.correo.toLowerCase()
  );
  return usuario ? { nombre: usuario.nombre, correo: usuario.correo } : null;
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}
