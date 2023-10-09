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
  console.log(table, data);
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      console.log(result);
      console.log(err);
      resolve(data);
    });
  });
}

function update (table, data) {
  console.log(table, data);
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE Id = ?`, [data, data.id], (err, result) => {
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
  let joinQuery = '';
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
      if (err) return reject(err);
      console.log(res);
      resolve({ ...res[0] } || null);
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
