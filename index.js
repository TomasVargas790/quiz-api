import Express from 'express';
import { env } from './config.js';
import router from './api/routes.js';
import { errors } from './network/errors.js';
import { setHeaders } from './utils/axios/setHeaders.js';
const app = Express();
/* {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization:  */
app.use(Express.json());
/* app.use('/api/v1', (req, res, next) => {
   axios.interceptors.request.use(function (config) {
    console.log('[config]', config);
    config.headers.authorization = 'aaaaaaaaaaaaaaaaaaa';
    return config;
  });

}); */
app.use('/api/v1', setHeaders, router);

app.use(errors);

app.listen(env.api.port, (req, res) => {
  console.log(`Quiz API en [${env.api.port}]`);
});
