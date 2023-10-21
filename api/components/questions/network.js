
import { Router } from 'express';
import { success } from '../../../network/response.js';
import { QuestionClass } from './controller.js';
import { validatorHandler } from '../../../utils/validateSchema/validate.js';
import { createQuestionSchema, getQuestionSchema, updateQuestionSchema } from './schema.js';
const router = Router();
const service = new QuestionClass();

router.get('/', list);
router.get('/:id', validatorHandler(getQuestionSchema, 'params'), get);
router.post('/', validatorHandler(createQuestionSchema, 'body'), insert);
router.patch('/', validatorHandler(updateQuestionSchema, 'body'), update);
router.delete('/:id', remove);

async function list (req, res, next) {
  try {
    const result = await service.list();
    success(req, res, result, 200);
  } catch (error) {
    next(error, req, res);
  }
}
async function get (req, res, next) {
  try {
    const result = await service.get({ id: req.params.id });
    /*     const newResult = Object.entries(result).map(a => {
      const isRef = a[0].includes('Ref');
      if (isRef) return [a[0].replace('Ref', ''), a[1]];
      return [...a];
    });
    console.log(newResult);
  */
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
