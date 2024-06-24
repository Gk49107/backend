const { pbkdf2 } = require('node:crypto');

export function pbkdf2Promise(password, salt) {
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 1000, 64, 'sha256', (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });
}
