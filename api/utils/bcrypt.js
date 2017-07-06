import bcrypt from 'bcryptjs';
import config from '../config/bcrypt';

class Bcrypt {
  hash(data) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(data, config.saltLength, (error, hash) => {
        if (error) {
          return reject(error);
        }

        resolve(hash);
      });
    });
  }

  compare(data, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(data, hash, (error, equal) => {
        if (error) {
          return reject(error);
        }

        resolve(equal);
      })
    });
  }
}

export default new Bcrypt;
