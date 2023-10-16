import axios from 'axios';

export default function CreateRemoteDataBaseApi (host, port) {
  const remoteDataBaseCall = axios.create({
    baseURL: `//${host}:${port}/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });

  function request ({ method, url, data }) {
    return new Promise((resolve, reject) => {
      remoteDataBaseCall({
        method,
        url,
        data,
        headers: {
          authorization: axios.defaults.headers.common.authorization
        }
      })
        .then(response => resolve(response.data.body))
        .catch(error => {
          console.log(error.response.data);
          reject(error.response.data);
        });
    });
  }

  function list ({ tabla }) {
    return request({
      method: 'GET',
      url: `${tabla}`
    });
  }

  function get ({ tabla, id }) {
    return request({
      method: 'GET',
      url: `${tabla}/${id}`
    });
  }

  function query ({ tabla, query, join = '' }) {
    return request({
      method: 'POST',
      url: `${tabla}/query`,
      data: {
        query,
        join
      }
    });
  }

  function update ({ tabla, data }) {
    return request({
      method: 'PATCH',
      url: `${tabla}`,
      data
    });
  }

  async function insert ({ tabla, data }) {
    return request({
      method: 'POST',
      url: `${tabla}`,
      data
    });
  }

  async function remove ({ tabla, id }) {
    return request({
      method: 'DELETE',
      url: `${tabla}/${id}`
    });
  }

  return {
    list,
    get,
    query,
    update,
    insert,
    remove
  };
}
