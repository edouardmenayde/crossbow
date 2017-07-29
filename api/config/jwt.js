export default {
    secretKey: process.env.JWT_SECRET_KEY || 'DEFAULT_SECRET_KEY',
    options  : {
        algorithm: process.env.JWT_ALGORITHM || 'HS512',
        expiresIn: process.env.JWT_EXPIRES_IN || '168h',
    },
};
