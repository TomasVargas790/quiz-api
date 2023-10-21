import err from '../../../utils/error/error.js';
import Sequelize from '../../../store/sequelize/sequelize.js';

const models = Sequelize.models;

export class QuestionClass {
  async list () {
    try {
      return await models.Question.findAll({ include: ['theme', 'nextQuestionRef', 'prevQuestion'] });
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async get ({ id }) {
    try {
      const result = await models.Question.findByPk(id, {
        include: ['theme', 'nextQuestionRef', 'prevQuestion']
      });
      if (!result) throw err('No hay registros', 404);
      return result;
    } catch (error) {
      console.log(error.status);
      throw err(error.message, error.status);
    }
  }

  async insert ({ data }) {
    console.log(data);
    try {
      return await models.Question.create(data);
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async update ({ data }) {
    try {
      const question = await this.get({ id: data.id });
      const rta = await question.update(data);
      return rta;
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async remove ({ id }) {
    try {
      return await models.Question.destroy(id);
    } catch (error) {
      throw err(error, error.status);
    }
  }
}
