import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const SECRETS_DIR = '/mnt/secrets';
//8
app.listen(8080, () => {
 console.log('Server running on port 8080');
});

app.get('/', (req, res, next) => {
  console.log("TEST LOG");

  const mountedSecrets = {};
  if (fs.existsSync(SECRETS_DIR)) {
    for (const name of fs.readdirSync(SECRETS_DIR)) {
      mountedSecrets[name] = fs.readFileSync(path.join(SECRETS_DIR, name), 'utf8');
    }
  }

  res.json({
    message: 'Hello, World!',
    env: process.env,
    mountedSecrets
  });
});
