import R from 'ramda';
import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { userModel } from './user.repository';
import { JWT_SECRET } from '../../config';

const findUser = async ({ email }) => {
  const foundUser = await userModel.findOne({ email });

  return foundUser;
};

export const decodeToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('INVALID_TOKEN', error.message);
  }
};

const generateToken = (user) => jwt.sign(user, JWT_SECRET, {
  expiresIn: 60 * 60 * 24,
});

const createUser = async ({ email, password }) => {
  if (R.any(R.isNil, [password, email])) {
    throw new Error('Invalid credentials');
  }

  const foundUser = await findUser({ email });

  if (!R.isNil(foundUser)) {
    throw new Error('User already exists');
  }

  const hashPassword = await hash(password, 1);

  const createdUser = await userModel.create({
    email,
    password: hashPassword,
  });
  const generatedToken = generateToken({ email: createdUser.email });

  return generatedToken;
};

const authenticateUser = async ({ email, password }) => {
  if (R.any(R.isNil, [password, email])) {
    throw new Error('Invalid credentials');
  }

  const foundUser = await findUser({ email });

  if (R.isEmpty(foundUser)) {
    throw new Error('Invalid credentials');
  }

  const isPasswordCorrect = await compare(password, foundUser.password);

  if (isPasswordCorrect) {
    return generateToken({ email: foundUser.email });
  }

  throw new Error('Invalid credentials');
};

export {
  createUser,
  findUser,
  authenticateUser,
};
