import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import connectDataAccess from './dataAccess';

connectDataAccess();

const app = express();

app.use(bodyParser.json());
app.use('/', routes());

// eslint-disable-next-line no-console
app.listen(3000, () => console.log(`Example app listening on port ${3000}!`));
