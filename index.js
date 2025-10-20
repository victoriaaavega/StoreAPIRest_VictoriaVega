import express from 'express';
import { AppError, globlaErrorHandler} from './utils/appError.js';
import morgan from 'morgan';
import corsMiddleware from './utils/validateCORS.js';
import jwt from 'jsonwebtoken';
import productorouter from './routers/productoRouter.js';
import { conectar } from './config/db.js';
import validateJWT from './utils/validateJWT.js';

const app = express();
//Middleware para analizar los datos del cuerpo de las solicitudes en formato JSON
app.use(express.json());

//Configurar el middleware de morgan para el registro de solicitudes en consola
app.use(morgan('combined'));

app.use(corsMiddleware);

app.post('api/users/login', (req, res) => {
    const { username, password } = req.body;

    if(username === 'admin' && password === 'password') {
        const payload = {
            userId: 1,
            username: 'admin',
            role: 'admin'
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({
            msg: 'Se inició sesión con éxito.',
            token
        })
    } else {
        next (new AppError('Usuario o contraseña inválidos.', 401));
    }
})

app.use(validateJWT);

//Middleware para exponer mis rutas y puedan ser accedidas
app.use('/api/productos', validateJWT, productorouter)

app.use((req,res,next)=>{
    const error = new AppError(`No se ha podido acceder a ${req.originalUrl} en el servidor`, 404);
    next(error);
});

app.use(globlaErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})