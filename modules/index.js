const debug = require('debug');

// Instancias de debug
const logAuth = debug('app:auth');
const logDB = debug('app:database');
const logHTTP = debug('app:http');

function verificarPermisosInternos(usuario) {
  console.trace(`[TRACE] Verificando pila de llamadas para: ${usuario}`);
}

function autenticarYRegistrar(usuario) {
  console.group(`Autenticación: ${usuario}`);
  console.count(`Acceso de usuario ${usuario}`);
  logAuth(`Autenticando usuario: ${usuario}`);
  verificarPermisosInternos(usuario);
  console.groupEnd();
}

function ejecutarDiagnostico() {
  console.log('=== Inicio del sistema ===');
  console.time('ProcesoPrincipal');

  // Sección: Accesos
  console.group('1. Registro de Accesos');
  autenticarYRegistrar('Carlos');
  autenticarYRegistrar('Ana');
  autenticarYRegistrar('Carlos');
  console.groupEnd();

  // Sección: Estado del sistema
  console.group('2. Diagnóstico del Sistema');
  logHTTP('Petición recibida en GET /login');
  console.warn('Capacidad de usuarios alcanzando el límite');
  logDB('Intentando reconexión a PostgreSQL...');
  logDB('Error: Connection Timeout');
  console.error('Error: No se pudo conectar a la base de datos');
  console.groupEnd();

  // Sección: Datos
  console.group('3. Usuarios Registrados');
  const usuarios = [
    { nombre: 'Carlos', rol: 'Admin' },
    { nombre: 'Ana', rol: 'User' }
  ];
  console.table(usuarios);
  console.groupEnd();

  console.timeEnd('ProcesoPrincipal');
  console.log('=== Fin del sistema ===');
}

module.exports = { ejecutarDiagnostico };