import { Router } from 'express';
import { store } from '../../store/mysql.js';
import { success, error } from '../../network/response.js';
const router = Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.post('/:table/query', query);
router.patch('/:table', update);
router.delete('/:table/:id', remove);

async function list (req, res, next) {
  try {
    const result = await store.list(req.params.table);
    console.log(result);
    success(req, res, result, 200);
  } catch (err) {
    console.log('------------------------------', err);
    error(err.message, err.code);
    // next(err, req, res);
  }
}
async function get (req, res, next) {
  try {
    const result = await store.get(req.params.table, req.params.id);
    success(req, res, result, 200);
  } catch (err) {
    next(err, req, res);
  }
}
async function insert (req, res, next) {
  try {
    console.log('[oaoaoa]', { table: req.params.table, body: req.body });
    const result = await store.insert(req.params.table, req.body);
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function update (req, res, next) {
  try {
    const result = await store.update(req.params.table, req.body);
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}
async function remove (req, res, next) {
  console.log(req.params);
  try {
    const result = await store.remove(req.params.table, req.params.id);
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}

async function query (req, res, next) {
  try {
    const result = await store.query(req.params.table, req.body.query, req.body.join);
    success(req, res, result, 201);
  } catch (err) {
    next(err, req, res);
  }
}

export default router;
