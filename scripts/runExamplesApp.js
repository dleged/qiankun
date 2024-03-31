#!/usr/bin/env zx

const { spawn } = require('child_process');
const http = require('http');
const ports = [7100, 7101, 7102, 7103, 7104, 7105, 7099];

// 打印日志函数
function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

function remove(ports, port) {
  const index = ports.indexOf(port);
  if (index !== -1) {
    ports.splice(index, 1);
  }
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
function checkPortsLoop() {

  function loop() {
    return Promise.all(ports.map(port => {
      return new Promise((resolve, reject) => { // 将 reject 函数传递给 Promise 构造函数
        const request = http.request({ host: 'localhost', port, timeout: 6000 }, response => {
          if (response.statusCode === 200) {
            resolve();
            remove(ports, port);
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


  return new Promise((resolve, reject) => {
    let maxRetryCount = 100;
    let retryCount = 0;

    function retry() {
      loop()
        .then(resolve)
        .catch((err) => {
          if (retryCount > maxRetryCount) {
            return reject(err);
          }
          setTimeout(retry, 1000 * 5);
          retryCount++;
        });
    }

    retry();

  });

}

async function runExamplesApp() {
  log('Killing processes...');
  killProcesses();
  log('Processes killed');

  log('Starting command...');

  spawn('yarn', ['examples:start'], { stdio: 'inherit' });

  log('Checking ports...');
  await checkPortsLoop();
  log('All ports are accessible');
}

module.exports = runExamplesApp;