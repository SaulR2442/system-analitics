const readline = require('readline');

function iniciarCLI(callbackAlSalir) {
  const inicio = Date.now();

  console.log('\nBienvenido a la CLI de ejemplo');
  console.log('Comandos disponibles: hola, tiempo, duracion, salir');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Ingresa un comando: '
  });

  rl.prompt();

  rl.on('line', (line) => {
    const input = line.trim().toLowerCase();

    switch (input) {
      case 'hola':
        console.log('¡Hola! ¿Cómo estás?');
        break;

      case 'tiempo':
        console.log(`Tiempo activo del proceso: ${process.uptime().toFixed(2)} segundos`);
        break;

      case 'duracion':
        const segundos = ((Date.now() - inicio) / 1000).toFixed(2);
        console.log(`Duración de la sesión: ${segundos} segundos`);
        break;

      case 'salir':
        console.log('Saliendo de la CLI...');
        rl.close();
        if (callbackAlSalir) callbackAlSalir();
        return;

      default:
        console.log('Comando no reconocido');
    }

    rl.prompt();
  });
}

module.exports = { iniciarCLI };