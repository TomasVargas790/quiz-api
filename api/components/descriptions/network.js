
import { Router } from 'express';
import { success } from '../../../network/response.js';
import { DescriptionClass } from './controller.js';
import { validatorHandler } from '../../../utils/validateSchema/validate.js';
import { createDescriptionSchema, getDescriptionSchema, updateDescriptionSchema } from './schema.js';

const router = Router();
const service = new DescriptionClass();

router.get('/', list);
router.get('/:id', validatorHandler(getDescriptionSchema, 'params'), get);
router.post('/', validatorHandler(createDescriptionSchema, 'body'), insert);
router.patch('/', validatorHandler(updateDescriptionSchema, 'body'), update);
router.delete('/:id', remove);

async function list (req, res, next) {
  try {
    const result = await service.list({ });
    success(req, res, result, 200);
  } catch (error) {
    next(error, req, res);
  }
}
async function get (req, res, next) {
  try {
    const result = await service.get({ id: req.params.id });
    success(req, res, result, 200);
  } catch (err) {
    next(err, req, res);
  }
}
async function insert (req, res, next) {
  try {
    const result = await service.insert({ data: req.body });

    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function update (req, res, next) {
  try {
    const result = await service.update({ id: req.params.id, data: req.body });
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function remove (req, res, next) {
  try {
    const result = await service.remove({ id: req.params.id });
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}

export default router;
