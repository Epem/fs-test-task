import fs from 'fs';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const controllers = {};

async function addModule(obj, moduleName, modulePath) {
  const importedModule = await import(modulePath);
  console.log(importedModule?.default)
  obj[moduleName] = importedModule?.default;
}

export const bootstrapControllers = async (siteData) => {
  for (const page of siteData) {
      if (!controllers[page.controller]) {
          console.log(`BOOTSTRAPPING: ${page.controller} controller`);
          await addModule(controllers, page.controller, `../controller/${page.controller}.js`);
      }
  }
  console.log('ALL SYSTEMS BOOTSTRAPPED!')
}

export const errorBodyHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const bootstrapAPI = async (app) => {
  const api = readData('config');
  await bootstrapControllers(api)
  if (!api || !api.length) process.exit(1);
  api.forEach((endpoint) => {
    switch (endpoint.method) {
      case 'GET':
        app.get(endpoint.url, controllers[endpoint.controller](endpoint));
        break;
      case 'POST':
        app.post(endpoint.url, controllers[endpoint.controller](endpoint));
        break;
    }
  });

  app.use((req, res) => {
    res.status(404).send();
  });
};

export const emailRegex = (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)

export const hashString = (inputString) => {
  const hash = crypto.createHash('sha256');
  hash.update(inputString);
  return hash.digest('hex');
}

export const readData = (file) => {
  try {
    const siteData = fs.readFileSync(`./${file}.json`, 'utf8');
    return JSON.parse(siteData);
  } catch (error) {
    console.error(`Error while reading file ${file}.json:`, error);
    return []
  }
};

export const uuidv4 = () => {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export const checkUUIDPattern = (inputString) => {
  const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  return pattern.test(inputString);
}



export const jwtGenerate = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return token;
}

export const jwtVerify = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}
