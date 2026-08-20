// Importación de módulos nativos (os) y librerías externas para estilos (chalk)
const os = require('os');
const chalk = require('chalk');

function obtenerInformacionSistema() {
  function mostrarInformacion() {
    console.clear();

    console.log('🖥️  Monitor de Sistema');
    console.log('========================');
    // os.platform() e os.arch() retornan el S.O. (ej. 'linux') y la arquitectura de la CPU (ej. 'x64')
    console.log(`Sistema: ${os.platform()} (${os.arch()})`);
    
    // os.cpus() retorna un arreglo con los detalles de cada núcleo lógico del procesador
    console.log(`CPU: ${os.cpus()[0].model}`);
    console.log(`Cores: ${os.cpus().length}`);
    
    // Conversión de bytes a Megabytes (Bytes / 1024^2) para la memoria RAM
    console.log(`Memoria Libre: ${(os.freemem() / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Memoria Total: ${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB`);
    
    // os.uptime() entrega los segundos de actividad del S.O.; se divide por 60 para mostrar minutos
    console.log(`Uptime: ${(os.uptime() / 60).toFixed(2)} minutos`);
    
    // os.userInfo() recupera la información del usuario del sistema operativo actual
    console.log(`Usuario: ${os.userInfo().username}`);
    console.log('========================\n');
  }

  mostrarInformacion();
}

// Exporta el módulo para consumo en el menú principal
module.exports = { obtenerInformacionSistema };