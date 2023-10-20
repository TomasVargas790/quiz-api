import err from '../../../utils/error/error.js';
import Sequelize from '../../../store/sequelize/sequelize.js';
import bcrypt, { hash } from 'bcrypt';
import { sign } from '../../../mysql/utils/auth/jwt.js';

const models = Sequelize.models;
export class UserClass {
  async list () {
    try {
      return await models.User.findAll();
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async get ({ id }) {
    try {
      return await models.User.findByPk(id);
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async insert ({ data }) {
    console.log(data);
    try {
      data = {
        ...data,
        password: await hash(data.password, 8)
      };
      return await models.User.create(data);
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
      return await models.User.destroy(id);
    } catch (error) {
      throw err(error, error.status);
    }
  }

  async findByEmail ({ email }) {
    return models.User.findOne({
      where: { email }
    });
  }

  async login ({ email, password }) {
    try {
      const { dataValues: data } = await this.findByEmail({ email });
      console.log(data);
      if (!data) throw err('Correo o contraseña invalido :(', 400);
      const valid = await bcrypt.compare(password, data?.password ?? '');
      if (!valid) throw err('informacion incorrecta mi loco', 400);
      return sign(data);
    } catch (error) {
      throw err(error, 401);
    }
  }
}
