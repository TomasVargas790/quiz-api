import err from '../../../utils/error/error.js';

const TABLA = 'themes';

export default function (injectedStore) {
  const store = injectedStore;

  if (!store) throw new Error('Error al intentar conectar con la base de datos', 500);

  async function list () {
    try {
      return await store.list({ tabla: TABLA });
    } catch (error) {
      throw err(error.body, error.status);
    }
  }

  async function get ({ id }) {
    try {
      return await store.get({ tabla: TABLA, id });
    } catch (error) {
      throw err(error.body, error.status);
    }
  }

  async function insert ({ data }) {
    try {
      return await store.insert({ tabla: TABLA, data });
    } catch (error) {
      throw err(error.body, error.status);
    }
  }
  async function update ({ data }) {
    try {
      return await store.update({ tabla: TABLA, data });
    } catch (error) {
      throw err(error.body, error.status);
    }
  }
  async function remove ({ id }) {
    try {
      return await store.remove({ tabla: TABLA, id });
    } catch (error) {
      throw err(error.body, error.status);
    }
  }
  async function descriptions ({ id }) {
    const join = {};
    join.descriptions = 'theme'; // { user: 'user_to' }
    const query = { id };
    console.log(query);
    console.log('query', { tabla: TABLA, join, query });

    try {
      return await store.query({ tabla: TABLA, join, query });
    } catch (error) {
      throw err(error.body, error.status);
    }
  }

  return {
    list,
    get,
    insert,
    update,
    remove,
    descriptions
  };
}
