import Express from 'express';
import { env } from '../config.js';
import themes from './components/themes/network.js';
import { errors } from '../network/errors.js';
const app = Express();

app.use(Express.json());
app.use('/api/v1/themes', themes);

app.use(errors);

app.listen(env.api.port, (req, res) => {
  console.log(`Quiz API en [${env.api.port}]`);
});
