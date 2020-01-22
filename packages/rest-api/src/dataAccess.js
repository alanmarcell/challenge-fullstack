import Mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from './config';

let mongooseInstance;
let mongooseConnection;

const connect = () => {
  if (mongooseInstance) {
    return { mongooseInstance, mongooseConnection };
  }

  mongooseConnection = Mongoose.connection;
  mongooseConnection.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('Connected to mongodb url:');
  });

  mongooseInstance = Mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return { mongooseInstance, mongooseConnection };
};

export default connect;
