import err from '../../../utils/error/error.js';
import Sequelize from '../../../store/sequelize/sequelize.js';

const models = Sequelize.models;

export class AnswerClass {
  async list () {
    try {
      return await models.Answer.findAll();
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async get ({ id }) {
    try {
      return await models.Answer.findByPk();
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async insert ({ data }) {
    try {
      return await models.Answer.create(data);
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
      return await models.Answer.destroy(id);
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async descriptions ({ id }) {
    try {
      const themes = await models.Theme.findByPk(id, {
        include: ['descriptions']
      });
      if (!themes) throw err('No hay registros', 404);
      return themes;
    } catch (error) {
      throw err(error, error.status);
    }
  }
}
