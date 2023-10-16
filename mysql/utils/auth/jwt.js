import jwt from 'jsonwebtoken';
import { env } from '../../../config.js';
import err from '../../../utils/error/error.js';

export function sign (data) {
  return jwt.sign(data, env.mysql.authSecret);
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
export function decodeHeader (req, res, next) {
  console.log('[getToken]');//, req.headers);
  const authorization = req.headers.authorization ?? '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;
  next();
}
