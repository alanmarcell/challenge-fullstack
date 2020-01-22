import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import connectDataAccess from './dataAccess';

const port = process.env.PORT || 4000;
connectDataAccess();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes());

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
