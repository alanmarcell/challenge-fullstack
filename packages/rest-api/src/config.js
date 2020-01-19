import dotenv from 'dotenv';

dotenv.config();

export const { DB_CONNECTION_STRING, JWT_SECRET } = process.env;

const config = {
  DB_CONNECTION_STRING,
  JWT_SECRET,
};

export default config;
