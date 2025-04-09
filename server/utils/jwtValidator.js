import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { config } from 'dotenv';
config();

const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        if (err) return callback(err);
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

export function validateIdToken(idToken) {
    return new Promise((resolve, reject) => {
        jwt.verify(
            idToken,
            getKey,
            {
                audience: process.env.AUTH0_AUDIENCE,
                issuer: `https://${process.env.AUTH0_DOMAIN}/`,
                algorithms: ['RS256'],
            },
            (err, decoded) => {
                if (err) return reject(err);
                resolve(decoded);
            }
        );
    });
}
