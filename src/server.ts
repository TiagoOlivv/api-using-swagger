import express, { urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(routes);

app.listen(process.env.PORT || 3000);
