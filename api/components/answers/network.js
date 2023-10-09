
import { Router } from 'express';
import { success } from '../../../network/response.js';
import Controller from './index.js';
const router = Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', insert);
router.patch('/:id', update);
router.delete('/:id', remove);

async function list (req, res, next) {
  try {
    const result = await Controller.list({ jwt: req.headers.authorization });
    success(req, res, result, 200);
  } catch (error) {
    next(error, req, res);
  }
}
async function get (req, res, next) {
  try {
    const result = await Controller.get({ id: req.params.id, jwt: req.headers.authorization });
    success(req, res, result, 200);
  } catch (err) {
    next(err, req, res);
  }
}
async function insert (req, res, next) {
  try {
    const result = await Controller.insert({ jwt: req.headers.authorization, body: req.body });

    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function update (req, res, next) {
  try {
    const result = await Controller.update({ id: req.params.id, jwt: req.headers.authorization, body: req.body });
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function remove (req, res, next) {
  try {
    const result = await Controller.remove({ id: req.params.id, jwt: req.headers.authorization });
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}

export default router;
