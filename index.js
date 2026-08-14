import express from 'express';
import fs from 'fs';

const app = express();
const ENV_VAULT_PATH = '/.env';
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

  let vaultEnv = {};
  if (fs.existsSync(ENV_VAULT_PATH)) {
    vaultEnv = parseEnvFile(fs.readFileSync(ENV_VAULT_PATH, 'utf8'));
  }

  res.json({
    message: 'Hello, World!',
    env: process.env,
    vaultEnv
  });
});
