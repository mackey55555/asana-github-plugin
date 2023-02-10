console.log('ASANA_SECRET 3');
const core = require('@actions/core');
console.log('ASANA_SECRET 4');
const asana = require('asana');
console.log('ASANA_SECRET 5');
const wait = require('./wait');


// most @actions toolkit packages have async methods
async function run() {
    console.log('ASANA_SECRET 2');
  try {
    console.log('ASANA_SECRET 1');
    const ASANA_SECRET = core.getInput('asana-secret');
    console.log('ASANA_SECRET');
    console.log(ASANA_SECRET);
    console.log('ASANA_SECRET-----------------');
    const client = asana.Client.create().useAccessToken(ASANA_SECRET);
    client.users.me().then(function (me) {
      console.log(me);
    })

    const ms = core.getInput('milliseconds');
    core.info(`Waiting ${ms} milliseconds ...`);

    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
