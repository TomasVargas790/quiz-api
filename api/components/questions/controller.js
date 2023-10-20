import err from '../../../utils/error/error.js';
import Sequelize from '../../../store/sequelize/sequelize.js';

const models = Sequelize.models;

export class QuestionClass {
  async list () {
    try {
      return await models.Question.findAll();
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async get ({ id }) {
    try {
      return await models.Question.findByPk();
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async insert ({ data }) {
    try {
      return await models.Question.create(data);
    } catch (error) {
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
      return await models.Question.destroy(id);
    } catch (error) {
      throw err(error, error.status);
    }
  }
}
