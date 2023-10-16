import err from '../error/error.js';
export function validatorHandler (schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      throw err(error, 400);
    }
    next();
  };
}
