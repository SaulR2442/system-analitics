const readline = require('readline');
const { ejecutarDiagnostico } = require('../../Proyecto Playground: Registro y Depuración Avanzada/index');
const { iniciarCLI } = require('../../Proyecto Playground: Herramienta CLI Simple/cli-tool');
const { obtenerInformacionSistema } = require('../../Proyecto Playground: Monitor Simple del Sistema/system-monitor');

function menuPrincipal() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n========================================');
  console.log('     SYSTEM ANALYTICS - MENÚ');
  console.log('========================================');
  console.log('1. Práctica 1: Depuración y Logs (console + debug)');
  console.log('2. Práctica 2: Herramienta CLI interactiva');
  console.log('3. Práctica 3: Monitor del Sistema (os + chalk)');
  console.log('4. Salir');
  console.log('========================================');

  rl.question('Selecciona una opción (1-4): ', (opcion) => {
    rl.close(); // Cerramos readline para liberar process.stdin antes de cada sub-módulo

    switch (opcion.trim()) {
      case '1':
        console.clear();
        ejecutarDiagnostico();
        setTimeout(menuPrincipal, 1000);
        break;

      case '2':
        console.clear();
        iniciarCLI(); // Ejecuta la CLI interactiva completa con sus comandos
        break;

      case '3':
        obtenerInformacionSistema();
        console.log('Monitoreando cada 5 segundos... (Ctrl + C para salir)');
        setInterval(obtenerInformacionSistema, 5000);
        break;

      case '4':
        console.log('Saliendo de System Analytics...');
        process.exit(0);

      default:
        console.log('Opción no válida. Intenta de nuevo.');
        menuPrincipal();
        break;
    }
  });
}

menuPrincipal(); 