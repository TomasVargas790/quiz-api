import { config } from 'dotenv';
config();

export const env = {
  api: {
    port: process.env.PORT
  },
  mysql: {
    port: process.env.MYSQL_PORT,
    serverPort: process.env.MYSQL_SERVER_PORT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    authSecret: process.env.SECRET

  }
};
env.mysql.url = `mysql://${env.mysql.user}:${env.mysql.password}@${env.mysql.host}:${env.mysql.serverPort}/${env.mysql.database}`;

console.log(env.mysql);
