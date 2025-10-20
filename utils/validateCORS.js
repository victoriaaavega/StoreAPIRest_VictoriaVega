import cors from 'cors';

const allowesOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGINS.split(',') : [];

const corsOptions = {
    origin: (origin, callback) => {
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Cors no incluido.'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

export default cors(corsOptions);