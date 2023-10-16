import mysql from 'mysql2';

import { env } from '../config.js';

const dbConfig = {
  host: env.mysql.host,
  user: env.mysql.user,
  password: env.mysql.password,
  database: env.mysql.database
};

let connection;

function handleConnection () {
  connection = mysql.createPool({ ...dbConfig, waitForConnections: true, maxIdle: 10, enableKeepAlive: true });

  connection.on('error', err => {
    console.error('[db err]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') handleConnection();
    else throw err;
  });
}
handleConnection();

function list (table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
function get (table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE Id = "${id}"`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function insert (table, data) {
  const keys = Object.keys(data).join(',');
  const values = Object.values(data);

  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} (${keys}) VALUES (?);`, [values], (err, result, fields) => {
      if (err) return reject(err);
      console.log(result);
      console.log(err);
      console.log(fields);
      resolve(data);
    });
  });
}

function update (table, data) {
  console.log(table, data);
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE Id = ?`, [{ ...data, updatedAt: new Date() }, data.id], (err, result) => {
      if (err) return reject(err);
      console.log(result);
      console.log(err);
      resolve(data);
    });
  });
}
function remove (table, id) {
  console.log(table, id);
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${table} WHERE Id = "${id}"`, (err, result) => {
      if (err) return reject(err);
      console.log(result);
      console.log(err);
      resolve(id);
    });
  });
}
function query (table, query, join) {
  // console.log('oaaaaaaaa', { table, query, join });
  let joinQuery = '';
  let columns = `${table}.*`;
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    columns += `, ${key}.*`;
    joinQuery = `JOIN ${key} ON ${key}.${val} = ${table}.id`;
  }
  console.log(columns);
  return new Promise((resolve, reject) => {
    connection.query(`SELECT ${columns} FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
      if (err) return reject(err);
      console.log(res);
      resolve({ ...res } || null);
    });
  });
}

export const store = {
  list,
  get,
  insert,
  update,
  query,
  remove
};
