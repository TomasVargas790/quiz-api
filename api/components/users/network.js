import { Router } from 'express';
import { success } from '../../../network/response.js';
import { createUserSchema } from './schema.js';
import { UserClass } from './controller.js';
import { validatorHandler } from '../../../utils/validateSchema/validate.js';

const router = Router();
const service = new UserClass();

router.post('/login', validatorHandler(createUserSchema, 'body'), login);
router.post('/register', validatorHandler(createUserSchema, 'body'), insert);
router.delete('/', remove);

async function insert (req, res, next) {
  try {
    console.log('-------------------------register------------');
    const result = await service.insert({ data: req.body });
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function remove (req, res, next) {
  try {
    const result = await service.remove(req.params.table, req.params.id);
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function login (req, res, next) {
  try {
    const result = await service.login({ email: req.body.email, password: req.body.password });
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}

export default router;
