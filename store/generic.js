import axios from 'axios';

export default function CreateRemoteDataBaseApi (host, port) {
  const remoteDataBaseCall = axios.create({
    baseURL: `//${host}:${port}/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });

  async function request ({ method, url, data, headers }) {
    const reponse = await remoteDataBaseCall({
      method,
      url,
      data,
      headers
    });
    return reponse.data.body;
  }

  function list ({ tabla, jwt }) {
    return request({
      method: 'GET',
      url: `${tabla}`,
      headers: {
        authorization: jwt
      }
    });
  }

  function get ({ tabla, id, jwt }) {
    return request({
      method: 'GET',
      url: `${tabla}/${id}`,
      headers: {
        authorization: jwt
      }
    });
  }

  function query ({ tabla, query, join = '', jwt }) {
    return request({
      method: 'GET',
      url: `query/${tabla}`,
      data: {
        query,
        join
      },
      headers: {
        authorization: jwt
      }
    });
  }

  function create ({ table, data, jwt }) {
    return request({
      method: 'POST',
      url: `/${table}`,
      data,
      headers: {
        authorization: jwt
      }
    });
  }

  function update (table, dataId, data, jwt) {
    throw new Error('Not implemented');
  }

  async function insert ({ tabla, data, jwt }) {
    return request({
      method: 'POST',
      url: `${tabla}`,
      data,
      headers: {
        authorization: jwt
      }
    });
  }

  async function remove ({ tabla, id, jwt }) {
    return request({
      method: 'DELETE',
      url: `${tabla}/${id}`,
      headers: {
        authorization: jwt
      }
    });
  }

  return {
    list,
    get,
    query,
    create,
    update,
    insert,
    remove
  };
}
