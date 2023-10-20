
import { Router } from 'express';
import { success } from '../../../network/response.js';
import { AnswerClass } from './controller.js';
import { validatorHandler } from '../../../utils/validateSchema/validate.js';
import { createAnswerSchema, getAnswerSchema, updateAnswerSchema } from './schema.js';
const router = Router();

const service = new AnswerClass();

router.get('/', list);
router.get('/:id', validatorHandler(getAnswerSchema, 'params'), get);
router.post('/', validatorHandler(createAnswerSchema, 'body'), insert);
router.patch('/', validatorHandler(updateAnswerSchema, 'body'), update);
router.delete('/:id', remove);

async function list (req, res, next) {
  try {
    const result = await service.list({ jwt: req.headers.authorization });
    success(req, res, result, 200);
  } catch (error) {
    next(error, req, res);
  }
}
async function get (req, res, next) {
  try {
    const result = await service.get({ id: req.params.id, jwt: req.headers.authorization });
    success(req, res, result, 200);
  } catch (err) {
    next(err, req, res);
  }
}
async function insert (req, res, next) {
  try {
    const result = await service.insert({ jwt: req.headers.authorization, body: req.body });

    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function update (req, res, next) {
  try {
    const result = await service.update({ id: req.params.id, jwt: req.headers.authorization, body: req.body });
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function remove (req, res, next) {
  try {
    const result = await service.remove({ id: req.params.id, jwt: req.headers.authorization });
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}

export default router;
