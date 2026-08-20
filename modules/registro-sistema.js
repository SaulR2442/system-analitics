function ejecutarDiagnostico() {
  console.log("=== Inicio del sistema ===");

  // Inicia un temporizador interno para medir la duración de ejecución de este bloque
  console.time("ProcesoPrincipal");

  function accesoUsuario(usuario) {
    // Registra e incrementa un contador en consola asociándolo a la etiqueta enviada
    console.count(`Acceso de usuario ${usuario}`);
  }

  accesoUsuario('Carlos');
  accesoUsuario('Ana');
  accesoUsuario('Carlos');

  // Muestra un mensaje con formato de advertencia en stderr
  console.warn("Capacidad de usuarios alcanzando el límite");

  // Imprime un mensaje con formato de error crítico en stderr
  console.error("Error: No se pudo conectar a la base de datos");

  const usuarios = [
    { nombre: "Carlos", rol: "Admin" },
    { nombre: "Ana", rol: "User" }
  ];

  // Renderiza arreglos u objetos en formato de tabla estructurada
  console.table(usuarios);

  // Detiene el temporizador con la etiqueta 'ProcesoPrincipal' e imprime el tiempo transcurrido en ms
  console.timeEnd("ProcesoPrincipal");

  console.log("=== Fin del sistema ===");
}

// Exporta la función para ser consumida por el menú principal
module.exports = { ejecutarDiagnostico };