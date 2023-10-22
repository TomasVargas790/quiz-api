import { createPool } from 'mysql2';
import { env } from './config.js';

const pool = createPool({
  host: env.mysql.host,
  user: env.mysql.user,
  port: env.mysql.serverPort,
  password: env.mysql.password,
  database: env.mysql.database
});

/* pool.query('INSERT INTO themes(description) VALUES ("Tuco")', (err, result) => {
  console.log(result);
}); */
pool.query('SELECT * FROM themes', (err, result) => {
  console.log(result);
});
