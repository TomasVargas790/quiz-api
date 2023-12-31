import { error } from './response.js';
export function errors (err, req, res, next) {
  console.error('[err]', err);
  const message = err.message ?? 'Error interno';
  const status = err.status ?? 500;
  error(req, res, message, status);
}
