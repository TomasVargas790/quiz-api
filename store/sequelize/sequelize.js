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

export default sequelize;
