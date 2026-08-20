// Importación de módulos nativos y de terceros/locales
const readline = require('readline'); // Módulo nativo para gestionar la entrada/salida de datos por consola
const { ejecutarDiagnostico } = require('../modules/registro-sistema.js'); // Submódulo para depuración y formateo de logs
const { iniciarCLI } = require('../modules/cli-tool'); // Submódulo con interfaz de comandos independiente por eventos
const { obtenerInformacionSistema } = require('../modules/system-monitor'); // Submódulo para métricas del sistema (OS + Chalk)

function menuPrincipal() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`
========================================
     SYSTEM ANALYTICS - MENÚ
========================================
1. Práctica 1: Depuración y Logs (console + debug)
2. Práctica 2: Herramienta CLI interactiva
3. Práctica 3: Monitor del Sistema (os + chalk)
4. Salir
========================================`);

  rl.question('Selecciona una opción (1-4): ', (opcion) => {
    // Cierra el canal readline actual para ceder el control de process.stdin a los módulos secundarios
    rl.close();
    console.clear();

    switch (opcion.trim()) {
      case '1':
        ejecutarDiagnostico();
        // Pausa breve para evitar que la interfaz se solape con la salida de logs
        setTimeout(menuPrincipal, 1000);
        break;

      case '2':
        // Cede el control del proceso al sub-módulo CLI interactivo
        iniciarCLI();
        break;

      case '3':
        obtenerInformacionSistema();
        console.log('Monitoreando cada 5 segundos... (Ctrl + C para salir)');
        // Mantiene la tarea en ejecución continua mediante polling
        setInterval(obtenerInformacionSistema, 5000);
        break;

      case '4':
        console.log('Saliendo de System Analytics...');
        // Finaliza el proceso de Node.js con código de éxito (0)
        process.exit(0);

      default:
        console.log('Opción no válida. Intenta de nuevo.');
        // Reintentar recursivamente ante entradas no reconocidas
        menuPrincipal();
        break;
    }
  });
}

menuPrincipal();