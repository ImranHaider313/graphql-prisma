import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({ userId }, 'thisissecret')
}

export { generateToken as default }