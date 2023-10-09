import ctrl from './controller.js';
import storeGeneric from '../../../store/storeGeneric.js';

export default ctrl(storeGeneric);

/*
if (config.remoteDB === true) {
  store = require('../../../store/remote-mysql');
  cache = require('../../../store/remote-cache');
} else {
  store = require('../../../store/mysql');
  cache = require('../../../store/redis');
}
 */
