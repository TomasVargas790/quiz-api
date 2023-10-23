import jwt from 'jsonwebtoken';
import { env } from '../../config.js';
import err from '../error/error.js';
import { error } from '../../network/response.js';
import sequelize from '../../store/sequelize/sequelize.js';

export function sign (data) {
  return jwt.sign(data, env.mysql.authSecret, { expiresIn: '5m' });
}

function verify (token) {
  try {
    return jwt.verify(token, env.mysql.authSecret);
  } catch {
    throw err('Token invalido :(', 401);
  }
}

function getToken (auth) {
  if (!auth) throw err('No viene token', 400);
  if (auth.indexOf('Bearer ') === -1) throw err('Formato invalido', 400);
  return auth.replace('Bearer ', '');
}
export async function decodeHeader (req, res, next) {
  const authorization = req.headers.authorization ?? '';
  const token = getToken(authorization);
  const decoded = verify(token);

  const email = decoded?.email ?? '';

  const result = await sequelize.models.User.findOne({ where: { email } });
  console.log(result);
  if (!result) {
    return error(req, res, 'Sesión expirada', 401);
  } else next();
}
