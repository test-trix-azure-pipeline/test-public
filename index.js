import express from 'express';
import fs from 'fs';

const app = express();
const ENV_FILE_PATH = '/mnt/secrets/envfile/.env';
//8
app.listen(8080, () => {
 console.log('Server running on port 8080');
});

function parseEnvFile(content) {
  const result = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

app.get('/', (req, res, next) => {
  console.log("TEST LOG");

  let mountedEnv = {};
  if (fs.existsSync(ENV_FILE_PATH)) {
    mountedEnv = parseEnvFile(fs.readFileSync(ENV_FILE_PATH, 'utf8'));
  }

  res.json({
    message: 'Hello, World!',
    env: process.env,
    mountedEnv
  });
});
