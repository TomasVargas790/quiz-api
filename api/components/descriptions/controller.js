import err from '../../../utils/error/error.js';
import Sequelize from '../../../store/sequelize/sequelize.js';

const models = Sequelize.models;
export class DescriptionClass {
  async list () {
    try {
      return await models.Description.findAll();
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async get ({ id }) {
    try {
      return await models.Description.findByPk(id, {
        include: ['theme']
      });
    } catch (error) {
      console.log(error);
      throw err(error, error.status);
    }
  }

  async insert ({ data }) {
    try {
      console.log('comomomomo');
      return await models.Description.create(data);
    } catch (error) {
      console.log(error);
      throw err(error, error.status);
    }
  }

  async update ({ data }) {
    /* try {
      return await store.update({ tabla: TABLA, data });
    } catch (error) {
      throw err(error, error.status);
    } */
    throw err('Method no implemented puto', 500);
  }

  async remove ({ id }) {
    try {
      return await models.Description.destroy(id);
    } catch (error) {
      throw err(error, error.status);
    }
  }
}
