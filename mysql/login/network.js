import { Router } from 'express';
import { store } from '../../store/mysql.js';
import { success } from '../../network/response.js';
import bcrypt, { hash } from 'bcrypt';
import { sign } from '../utils/auth/jwt.js';
import err from '../../utils/error/error.js';
import { createUserSchema } from './schema.js';
import { validatorHandler } from '../utils/auth/validator.handler.js';
const tabla = 'users';
const router = Router();

router.post('/login', validatorHandler(createUserSchema, 'body'), login);
router.post('/register', validatorHandler(createUserSchema, 'body'), insert);
router.delete('/', remove);

async function insert (req, res, next) {
  try {
    req.body = {
      ...req.body,
      password: await hash(req.body.password, 8)
    };
    const result = await store.insert(tabla, req.body);
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function remove (req, res, next) {
  try {
    const result = await store.remove(req.params.table, req.params.id);
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function login (req, res, next) {
  try {
    console.log('--------------------------------------------------------');
    const data = await store.query(tabla, { email: req.body.email });
    if (!data) throw err('Correo o contraseña invalido :(', 400);
    return bcrypt.compare(req.body.password, data?.password ?? '')
      .then((result) => {
        if (!result) throw err('informacion incorrecta mi loco', 400);
        const token = sign(data);
        success(req, res, token, 200);
      })
      .catch(next);
  } catch (err) {
    next(err, req, res);
  }
}

export default router;
