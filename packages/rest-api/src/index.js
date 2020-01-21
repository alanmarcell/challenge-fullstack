import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import connectDataAccess from './dataAccess';

connectDataAccess();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', routes());

// eslint-disable-next-line no-console
app.listen(4000, () => console.log(`Example app listening on port ${4000}!`));
