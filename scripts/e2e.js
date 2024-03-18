const child_process = require('child_process');
const spawnSync = child_process.spawnSync;

function runAllExamples() {
  spawnSync('yarn', ['examples:start'], { stdio: 'inherit' });
}

function runE2eOpen() {
  spawnSync('yarn', ['test:e2e:open'], { stdio: 'inherit' });
}


runAllExamples();
runE2eOpen();

// runAllExamples().then(() => {
//   spawn('yarn test:e2e:open', { stdio: 'inherit' });
// });   