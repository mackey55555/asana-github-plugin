const wait = require('./wait');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('throws invalid number', async () => {
  await expect(wait('foo')).rejects.toThrow('milliseconds not a number');
});

test('wait 500 ms', async () => {
  const start = new Date();
  await wait(500);
  const end = new Date();
  var delta = Math.abs(end - start);
  expect(delta).toBeGreaterThanOrEqual(500);
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  console.log('test runs');
  
  process.env['INPUT_MILLISECONDS'] = 100;
  process.env['INPUT_ASANA_SECRET'] = 'LOM64PGNAQSWIPFUSDS3KTDHEEKVMNLMZR4SJZQXSJPZXKTLXELQST6H';
  console.log('INPUT_ASANA_SECRET');
  const ip = path.join(__dirname, 'index.js');
  console.log(ip);
  const result = cp.execSync(`node ${ip}`, {env: process.env}).toString();
  console.log('result');
  console.log(result);
})
