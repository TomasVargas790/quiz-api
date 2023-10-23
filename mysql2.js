import { createPool } from 'mysql2';
import { env } from './config.js';
import jwt from 'jsonwebtoken';
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
/* pool.query('SELECT * FROM users', (err, result) => {
  console.log(result);
}); */

const str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.-wBmDS80D9IN90KxTCTnhS3rFp6JWVE4FudTXiDR4Iw';

console.log(jwt.verify(str, env.mysql.authSecret));
