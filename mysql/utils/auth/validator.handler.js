import err from '../../../utils/error/error.js';

export function validatorHandler (schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) throw err('Bad request culiau', 400);
    next();
  };
}
