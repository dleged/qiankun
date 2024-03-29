const { execSync } = require('child_process');
const runExampleApp = require('./runExamplesApp');


runExampleApp().then(() => {
  console.log('start e2e test...');
  const spawnInstance = execSync('yarn test:e2e:open', { stdio: 'inherit' });
});