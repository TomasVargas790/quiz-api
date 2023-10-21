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
      const result = await models.Answer.findByPk(id, {
        include: ['questionIdRef', 'nextQuestionRef']
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
      return await models.Answer.create(data);
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async update ({ data }) {
    try {
      const answer = await this.get({ id: data.id });
      const rta = await answer.update(data);
      return rta;
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async remove ({ id }) {
    try {
      return await models.Answer.destroy(id);
    } catch (error) {
      throw err(error, error.status);
    }
  }
}
