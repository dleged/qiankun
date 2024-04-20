import { request } from '@playwright/test';
import child_process from 'child_process';

const { spawnSync } = child_process;


const ExampleEntry = ['http://localhost:7100', 'http://localhost:7102', 'http://localhost:7101', 'http://localhost:7103', 'http://localhost:7104', 'http://localhost:7105', 'http://localhost:7099'];

// async clickAndWaitForResponses(locator: string, urlsToWaitFor: string[]) {
//   const allResponsesPromise = Promise.all(urlsToWaitFor.map(url => page.waitForResponse(url)));
//   await this.page.locator(locator).first().click();
//   const responses = await allResponsesPromise;
// }

// // Calling function
// await clickAndWaitForResponses(`xpath`, ['url1', url3', 'url2']);



// 启动 examples:start 命令
const startProcess = spawnSync('npm', ['run', 'examples:start']);

// 监听命令的输出
startProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

startProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// 当命令退出时
startProcess.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
  
  // 在所有服务启动成功后，输出日志
  checkServices();
});

// 检查每个服务是否成功启动
function checkServices() {
  const promises = ExampleEntry.map(async (url) => (await request.newContext({ ignoreHTTPSErrors: true })).fetch(url));
  
  Promise.all(promises)
    .then(() => {
      console.log('All services have started successfully.');
    })
    .catch(error => {
      console.error('Failed to start all services:', error.message);
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
  spawn('yarn', ['examples:start'], { stdio: 'inherit' });
  
    
  console.log('Global setup running...');
  await waitForResponse();
  console.log('Global Setup Finished!');

}

export default globalSetup;