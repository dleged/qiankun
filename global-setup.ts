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

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

  return new Promise((resolve) => {

    let retryCount = 0;
    const maxRetryCount = 5;
    async function retry() {
      const entrys = [];
      for (const entry of ExampleEntry) {
        console.log(entry);
        entrys.push((await request.newContext({ ignoreHTTPSErrors: true })).fetch(entry));
        console.log('ServerUrl:', entry);
      }

      Promise.all(entrys).then((result) => {
        console.log('global setup ', result);
        resolve(true);
      }).catch(() => {
        if (maxRetryCount < retryCount) return resolve(false);
        retryCount++;
        retry();
      });
    }

    retry();
  });
}

async function globalSetup() {
  console.log('Global setup running...');
  const lanuchSuccess = await waitForResponse();

  if(lanuchSuccess){
   await wait(30 * 1000);
  }

  console.log('Global Setup Finished!');

}

export default globalSetup;