import { env } from '../config.js';

const USER = encodeURIComponent(env.mysql.user);
const PASSWORD = encodeURIComponent(env.mysql.password);
const HOST = encodeURIComponent(env.mysql.host);
const PORT = encodeURIComponent(env.mysql.serverPort);
const DATABASE = encodeURIComponent(env.mysql.database);
const URI = `mysql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;

console.log(URI);

export default {
  development: {
    url: URI,
    dialect: 'mysql'
  }/* ,
  production: {
    url: URI,
    dialect: 'mysql'
  } */
};
