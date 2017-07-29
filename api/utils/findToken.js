export default function findToken(req) {
    if (!req.headers) {
        return null;
    }

    if (!req.headers.authorization) {
        return null;
    }

    let parts = req.headers.authorization.split(' ');

    if (parts.length !== 2) {
        throw {
            error  : 'invalid_token',
            details: 'Format is Authorization: Bearer [token]',
        };
    }

    let token;
    let scheme      = parts[0];
    let credentials = parts[1];

    if (/^Bearer$/i.test(scheme)) {
        token = credentials;
    }

    req.body && delete req.body.token;
    req.query && delete req.query.token;

    return token;
}
