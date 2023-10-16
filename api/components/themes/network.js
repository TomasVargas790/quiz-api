
import { Router } from 'express';
import { success } from '../../../network/response.js';
import Controller from './index.js';
import { updateThemeSchema, createThemeSchema, getThemeSchema } from './schema.js';
import { validatorHandler } from '../../../utils/validateSchema/validate.js';
const router = Router();

router.get('/', list);
router.get('/:id', validatorHandler(getThemeSchema, 'params'), get);
router.get('/:id/descriptions', validatorHandler(getThemeSchema, 'params'), descriptions);
router.post('/', validatorHandler(createThemeSchema, 'body'), insert);
router.patch('/', validatorHandler(updateThemeSchema, 'body'), update);
router.delete('/:id', remove);

async function list (req, res, next) {
  try {
    const result = await Controller.list();
    success(req, res, result, 200);
  } catch (error) {
    next(error, req, res);
  }
}
async function get (req, res, next) {
  try {
    const result = await Controller.get({ id: req.params.id });
    success(req, res, result, 200);
  } catch (err) {
    next(err, req, res);
  }
}
async function insert (req, res, next) {
  try {
    console.log(req.body);
    const result = await Controller.insert({ data: req.body });
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function update (req, res, next) {
  try {
    const result = await Controller.update({ data: req.body });
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function remove (req, res, next) {
  try {
    const result = await Controller.remove({ id: req.params.id });
    success(req, res, result, 200);
  } catch (err) {
    next(err, req, res);
  }
}

async function descriptions (req, res, next) {
  try {
    const result = await Controller.descriptions({ id: req.params.id });
    success(req, res, result, 200);
  } catch (err) {
    next(err, req, res);
  }
}

export default router;
