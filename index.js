const core = require('@actions/core');
const asana = require('asana');
const wait = require('./wait');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const ASANA_SECRET = core.getInput('asana-secret')

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
