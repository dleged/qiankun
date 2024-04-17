import { request } from '@playwright/test';
import child_process from 'child_process';

const { spawn } = child_process;


const ExampleEntry = ['http://localhost:7100', 'http://localhost:7102', 'http://localhost:7101', 'http://localhost:7103', 'http://localhost:7104', 'http://localhost:7105', 'http://localhost:7099'];

// async clickAndWaitForResponses(locator: string, urlsToWaitFor: string[]) {
//   const allResponsesPromise = Promise.all(urlsToWaitFor.map(url => page.waitForResponse(url)));
//   await this.page.locator(locator).first().click();
//   const responses = await allResponsesPromise;
// }

// // Calling function
// await clickAndWaitForResponses(`xpath`, ['url1', url3', 'url2']);

async function waitForResponse() {
  spawn('yarn', ['examples:start']);

  for (const entry of ExampleEntry) {
    console.log(entry);
    (await request.newContext({ ignoreHTTPSErrors: true })).fetch(entry);
    console.log('ServerUrl:', entry);

  }
}


async function globalSetup() {

  console.log('Global setup running...');
  await waitForResponse();
  console.log('Global Setup Finished!');

}

export default globalSetup;