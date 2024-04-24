import { request } from '@playwright/test';
// import child_process from 'child_process';

// const { spawn } = child_process;

const ExampleEntry = ['http://localhost:7100', 'http://localhost:7102', 'http://localhost:7101', 'http://localhost:7103', 'http://localhost:7104', 'http://localhost:7105', 'http://localhost:7099'];

// 启动 examples:start 命令
// const startProcess = spawn('npm', ['run', 'examples:start'], { stdio: 'inherit' });

// // 监听命令的输出
// startProcess.on('data', (_data: any) => {
//   checkServices();
// });


// 检查每个服务是否成功启动
function checkServices() {
  const promises = ExampleEntry.map(async (url) => (await request.newContext({ ignoreHTTPSErrors: true })).fetch(url));

  return Promise.all(promises)
    .then(() => {
      console.log('All services have started successfully.');
      return true;
    })
    .catch(error => {
      console.error('Failed to start all services:', error.message);
      return false;
    });
}

async function waitForResponse() {
  for (const entry of ExampleEntry) {
    console.log(entry);
    (await request.newContext({ ignoreHTTPSErrors: true })).fetch(entry);
    console.log('ServerUrl:', entry);

  }
}

async function globalSetup() {
  // 执行 yarn examples:start 命令
  // spawn('yarn', ['examples:start'], { stdio: 'inherit' });

  console.log('Global setup running...');
  // await waitForResponse();
  console.log('Global Setup Finished!');

}

export default globalSetup;