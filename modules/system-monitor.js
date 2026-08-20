const os = require('os');
const chalk = require('chalk');

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

module.exports = { obtenerInformacionSistema };