import Express from 'express';
import { env } from '../config.js';
import { errors } from '../network/errors.js';
import db from './api/network.js';
import auth from './login/network.js';
import { decodeHeader } from './utils/auth/jwt.js';
const app = Express();

app.use(Express.json());

app.use('/', auth);
app.use('/', decodeHeader, db);

app.use(errors);

app.listen(env.mysql.port, (req, res) => {
  console.log(`Servicio de base de datos en [${env.mysql.port}]`);
});
