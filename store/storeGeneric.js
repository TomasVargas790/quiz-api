import RemoteDataBaseCall from './generic.js';

import { env } from '../config.js';

export default new RemoteDataBaseCall(env.mysql.host, env.mysql.port);
