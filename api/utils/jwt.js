import jwt from 'jsonwebtoken';
import config from '../config/jwt';

class JWT {
    encode(data) {
        return new Promise((resolve, reject) => {
            jwt.sign(data, config.secretKey, config.options, (error, encoded) => {
                if (error) {
                    return reject(error);
                }

                resolve(encoded);
            });
        });
    }

    decode(data) {
        return new Promise((resolve, reject) => {
            jwt.verify(data, config.secretKey, config.options, (error, decoded) => {
                if (error) {
                    return reject(error);
                }

                resolve(decoded);
            });
        });
    }
}

export default new JWT;
