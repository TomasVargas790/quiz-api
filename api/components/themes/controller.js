import err from '../../../utils/error/error.js';
import Sequelize from '../../../store/sequelize/sequelize.js';

const models = Sequelize.models;
export class ThemesClass {
  async list () {
    try {
      return await models.Theme.findAll({
        include: ['descriptions', {
          association: 'questions',
          include: ['nextQuestionRef', 'prevQuestion']
        }]
      });
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async get ({ id }) {
    try {
      const result = await models.Theme.findByPk(id);
      if (!result) throw err('No hay registros', 404);
      return result;
    } catch (error) {
      console.log(error.status);
      throw err(error.message, error.status);
    }
  }

  async insert ({ data }) {
    try {
      return await models.Theme.create(data);
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async update ({ data }) {
    try {
      const theme = await this.get({ id: data.id });
      const rta = await theme.update(data);
      return rta;
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async remove ({ id }) {
    try {
      return await models.Theme.destroy(id);
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

  async questions ({ id }) {
    try {
      const themes = await models.Theme.findByPk(id, {
        include: ['questions']
      });
      if (!themes) throw err('No hay registros', 404);
      return themes;
    } catch (error) {
      throw err(error, error.status);
    }
  }
}
