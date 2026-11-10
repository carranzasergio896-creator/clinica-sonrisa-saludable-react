// Validaciones compartidas por los formularios de citas y de acceso.
// Cada función regresa un mensaje de error, o una cadena vacía si el valor es válido.

export function validarNombre(valor) {
  const texto = valor.trim();
  if (!texto) return "Escribe tu nombre.";
  if (texto.length < 3) return "El nombre debe tener al menos 3 caracteres.";
  if (!/^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ' .]+$/.test(texto)) {
    return "El nombre solo puede contener letras.";
  }
  return "";
}

export function validarCorreo(valor) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())) {
    return "Escribe un correo electrónico válido.";
  }
  return "";
}

export function validarTelefono(valor) {
  if (!/^[0-9]{10}$/.test(valor)) {
    return "El teléfono debe tener exactamente 10 números.";
  }
  return "";
}

export function validarContrasena(valor) {
  if (valor.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  return "";
}
