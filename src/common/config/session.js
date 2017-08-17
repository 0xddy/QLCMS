'use strict';

/**
 * session configs
 */
export default {
  name: 'ql',
  type: 'file',
  secret: '6JE8NG@P',
  timeout: 24 * 3600,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.RUNTIME_PATH + '/session',
    }
  }
};