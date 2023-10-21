import { Sequelize } from 'sequelize';

import { env } from '../../config.js';
import setupModels from '../../db/models/index.js';

const options = {
  dialect: 'mysql',
  logging: !env.mysql.isProd
};

if (env.mysql.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(env.mysql.url, options);

setupModels(sequelize);

sequelize.models.Theme.beforeUpdate(theme => (theme.updatedAt = new Date()));
sequelize.models.Description.beforeUpdate(description => (description.updatedAt = new Date()));
sequelize.models.Question.beforeUpdate(question => (question.updatedAt = new Date()));
sequelize.models.Answer.beforeUpdate(answer => (answer.updatedAt = new Date()));
sequelize.models.User.beforeUpdate(user => (user.updatedAt = new Date()));
export default sequelize;
