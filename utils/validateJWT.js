import jwt from 'jsonwebtoken';
import { AppError } from './appError';

const validateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token) {
        next(new AppError('No se proporcionó un token.', 400));
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        next(new AppError('El token no es válido.', 500));
    }
}

export default validateJWT;