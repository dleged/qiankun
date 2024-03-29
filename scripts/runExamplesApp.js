const { spawnSync } = require('child_process');
const http = require('http');
const ports = [7100, 7120, 7101, 7103, 7104, 7105, 7099];

// 打印日志函数
function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// 杀死指定端口的进程
function killProcesses() {
  ports.forEach(port => {
    try {
      execSync(`kill $(lsof -t -i:${port})`);
      log(`Process on port ${port} killed`);
    } catch (error) {
      log(`No process found on port ${port}`);
    }
  });
}

// 检查端口是否可用
function checkPorts() {
  return Promise.all(ports.map(port => {
    return new Promise((resolve, reject) => { // 将 reject 函数传递给 Promise 构造函数
      const request = http.request({ host: 'localhost', port }, response => {
        if (response.statusCode === 200) {
          resolve();
        } else {
          reject(`Port ${port} is not available`);
        }
      });

      request.on('error', () => {
        reject(`Port ${port} is not available`);
      });

      request.end();
    });
  }));
}

// 启动命令
function startCommand() {
  const command = 'yarn';
  const args = ['examples:start'];
  const options = { stdio: 'inherit' };

  log('Starting command...');
  spawnSync(command, args, options);
  log('Example started successfully');
}


async function runExamplesApp() {
  log('Killing processes...');
  killProcesses();
  log('Processes killed');

  log('Starting command...');
  startCommand();

  log('Checking ports...');
  await checkPorts();
  log('All ports are accessible');
}

module.exports = runExamplesApp;