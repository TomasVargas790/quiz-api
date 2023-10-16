import axios from 'axios';
export function setHeaders (req, res, next) {
  axios.defaults.headers.common.authorization = req.headers.authorization;
  next();
}
