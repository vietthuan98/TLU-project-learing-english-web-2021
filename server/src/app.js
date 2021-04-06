import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import './database';
import router from './route';

const app = express();
const port = process.env.PORT || 3000;
const whiteList = process.env.CORS_WHITE_LIST;

const corsOptions = {
    origin: whiteList.split(','), // allow cors in local
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/api', router);

app.get('/ping', (req, res) => res.status(200).send('Server is running...'));

app.listen(port, () =>
    console.log(`App is listening at port: http://localhost:${port}`)
);
