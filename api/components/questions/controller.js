const TABLA = 'questions';

export default function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }

  async function list ({ jwt }) {
    console.log(jwt);
    const users = store.list({ tabla: TABLA, jwt });
    return users;
  }

  async function get ({ id, jwt }) {
    return store.get({ tabla: TABLA, id, jwt });
  }

  async function insert ({ id, data, jwt }) {
    return store.insert({ tabla: TABLA, data, jwt });
  }

  return {
    list,
    get,
    insert
  };
}
