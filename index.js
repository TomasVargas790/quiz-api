import Express from 'express';
import { env } from './config.js';
import router from './api/routes.js';
import { errors } from './network/errors.js';
import { setHeaders } from './utils/axios/setHeaders.js';
import auth from './api/components/users/network.js';
import { decodeHeader } from './mysql/utils/auth/jwt.js';
const app = Express();

app.use(Express.json());

app.use('/api/v1/', auth);

app.use('/', decodeHeader);
app.use('/api/v1', setHeaders, router);

app.use(errors);

app.listen(env.api.port, (req, res) => {
  console.log(`Quiz API en [${env.api.port}]`);
});
