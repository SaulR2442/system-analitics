// Módulo nativo para gestionar la entrada/salida de datos por consola de forma asíncrona
const readline = require('readline');

function iniciarCLI() {
  console.log("Bienvenido a la CLI de ejemplo");
  console.log("Comandos disponibles: hola, tiempo, salir");

  // Crea una interfaz independiente de readline vinculada a la terminal
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Función recursiva para mantener el ciclo de preguntas/respuestas activo
  const pedirComando = () => {
    rl.question('Ingresa un nuevo comando: ', (data) => {
      // Normaliza la entrada del usuario eliminando espacios y convirtiendo a minúsculas
      const input = data.trim().toLowerCase();

      switch (input) {
        case "hola":
          console.log("¡Hola! ¿Cómo estás?");
          pedirComando(); // Reagenda la lectura para el siguiente comando
          break;

        case "tiempo":
          // process.uptime() retorna en segundos el tiempo de ejecución del proceso de Node.js
          console.log(`Tiempo activo: ${process.uptime().toFixed(2)} segundos`);
          pedirComando();
          break;

        case "salir":
          console.log("Saliendo...");
          rl.close(); // Libera la interfaz readline antes de finalizar
          process.exit(0); // Cierra el proceso de Node.js con código de éxito (0)
          break;

        default:
          console.log("Comando no reconocido");
          pedirComando();
          break;
      }
    });
  };

  // Inicia el primer ciclo de lectura de la CLI
  pedirComando();
}

// Exporta la función como un método del objeto para su consumo en app.js
module.exports = { iniciarCLI };