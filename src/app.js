const os = require('os');
const chalk = require('chalk');
const debug = require('debug');

// Instancias de Logger (Práctica 1)
const logAuth = debug('app:auth');
const logDB = debug('app:database');
const logHTTP = debug('app:http');

// --- MÓDULO 1: DIAGNÓSTICO Y LOGS (Práctica 1) ---
function ejecutarDiagnostico() {
  console.time('DiagnosticoSistema');
  
  console.group('1. Registro de Accesos');
  autenticarYRegistrar('Carlos');
  autenticarYRegistrar('Ana');
  autenticarYRegistrar('Carlos');
  console.groupEnd();

  console.group('2. Diagnóstico del Sistema');
  logHTTP('Petición recibida en GET /login');
  console.warn('Capacidad de usuarios alcanzando el límite');
  logDB('Intentando reconexión a PostgreSQL...');
  console.error('Error: No se pudo conectar a la base de datos');
  console.groupEnd();

  console.group('3. Usuarios Registrados');
  const usuarios = [
    { nombre: 'Carlos', rol: 'Admin' },
    { nombre: 'Ana', rol: 'User' }
  ];
  console.table(usuarios);
  console.groupEnd();

  console.timeEnd('DiagnosticoSistema');
}

function autenticarYRegistrar(usuario) {
  console.group(`Autenticación: ${usuario}`);
  console.count(`Acceso de usuario ${usuario}`);
  logAuth(`Autenticando usuario: ${usuario}`);
  verificarPermisosInternos(usuario);
  console.groupEnd();
}

function verificarPermisosInternos(usuario) {
  console.trace(`[TRACE] Verificando pila de llamadas para: ${usuario}`);
}

// --- MÓDULO 2: MONITOR DE SISTEMA (Práctica 3) ---
function obtenerInformacionSistema() {
  console.clear();
  console.log(chalk.bold.cyan('🖥️   MONITOR DE SISTEMA'));
  console.log(chalk.cyan('========================================'));

  console.log(`${chalk.bold('Sistema:')} ${chalk.white(os.platform())} (${chalk.white(os.arch())})`);
  console.log(`${chalk.bold('CPU:')} ${chalk.white(os.cpus()[0].model)}`);
  console.log(`${chalk.bold('Cores:')} ${chalk.white(os.cpus().length)}`);
  console.log(`${chalk.bold('Usuario:')} ${chalk.magenta(os.userInfo().username)}`);

  const totalMemMB = os.totalmem() / (1024 * 1024);
  const freeMemMB = os.freemem() / (1024 * 1024);
  const usedMemMB = totalMemMB - freeMemMB;
  const memUsagePct = ((usedMemMB / totalMemMB) * 100).toFixed(1);

  let memColor = chalk.green;
  if (memUsagePct > 80) memColor = chalk.red;
  else if (memUsagePct > 60) memColor = chalk.yellow;

  console.log(
    `${chalk.bold('Memoria:')} ${memColor(`${usedMemMB.toFixed(0)} MB / ${totalMemMB.toFixed(0)} MB (${memUsagePct}%)`)}`
  );

  const loadAvg = os.loadavg();
  const coresCount = os.cpus().length;
  
  let loadAlert = chalk.green('Normal');
  if (loadAvg[0] >= coresCount) {
    loadAlert = chalk.bgRed.white.bold(' ⚠️  ALERTA: CARGA CRÍTICA ');
  } else if (loadAvg[0] >= coresCount * 0.7) {
    loadAlert = chalk.bgYellow.black.bold(' ⚠️  PRECAUCIÓN ');
  }

  console.log(
    `${chalk.bold('Carga Prom (1/5/15 min):')} ${chalk.yellow(
      loadAvg.map(l => l.toFixed(2)).join(' | ')
    )} ${loadAlert}`
  );

  console.log(`${chalk.bold('Uptime:')} ${chalk.blue((os.uptime() / 60).toFixed(2))} minutos`);

  console.log(chalk.cyan('\n🌐 Interfaces de Red:'));
  console.log(chalk.cyan('----------------------------------------'));
  
  const networkInterfaces = os.networkInterfaces();
  
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    const addresses = networkInterfaces[interfaceName];
    const ipv4 = addresses.find(addr => addr.family === 'IPv4' && !addr.internal);
    if (ipv4) {
      console.log(` • ${chalk.bold.gray(interfaceName)}: ${chalk.green(ipv4.address)}`);
    }
  });

  console.log(chalk.cyan('========================================\n'));
}

// --- MÓDULO 3: CLI INTERACTIVA (Práctica 2) ---
const inicio = Date.now();
let intervalMonitorId = null;

function mostrarMenu() {
  console.log('\n--- SYSTEM ANALYTICS CLI ---');
  console.log('Comandos: monitor, detener, diagnostico, tiempo, duracion, salir');
  process.stdout.write('Ingresa un comando: ');
}

process.stdin.setEncoding('utf-8');
mostrarMenu();

process.stdin.on('data', (data) => {
  const input = data.trim().toLowerCase();

  switch (input) {
    case 'monitor':
      if (intervalMonitorId) clearInterval(intervalMonitorId);
      obtenerInformacionSistema();
      intervalMonitorId = setInterval(obtenerInformacionSistema, 5000);
      break;

    case 'detener':
      if (intervalMonitorId) {
        clearInterval(intervalMonitorId);
        intervalMonitorId = null;
        console.log('Monitoreo en tiempo real detenido.');
      } else {
        console.log('No hay monitoreo activo.');
      }
      mostrarMenu();
      break;

    case 'diagnostico':
      if (intervalMonitorId) clearInterval(intervalMonitorId);
      ejecutarDiagnostico();
      mostrarMenu();
      break;

    case 'tiempo':
      console.log(`Tiempo activo del proceso: ${process.uptime().toFixed(2)} segundos`);
      mostrarMenu();
      break;

    case 'duracion':
      const segundos = ((Date.now() - inicio) / 1000).toFixed(2);
      console.log(`Duración de la sesión CLI: ${segundos} segundos`);
      mostrarMenu();
      break;

    case 'salir':
      if (intervalMonitorId) clearInterval(intervalMonitorId);
      console.log('Cerrando System Analytics...');
      process.exit(0);

    default:
      console.log('Comando no reconocido.');
      mostrarMenu();
  }
});