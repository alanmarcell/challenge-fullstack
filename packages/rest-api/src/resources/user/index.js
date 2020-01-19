import R from 'ramda';
import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { userModel } from './user.repository';
import { JWT_SECRET } from '../../config';

const findUser = async ({ email }) => {
  const foundUser = await userModel.findOne({ email });

  return foundUser;
};

export const decodeToken = (token) => jwt.verify(token, JWT_SECRET);

const generateToken = (user) => jwt.sign(user, JWT_SECRET, {
  expiresIn: 10 * 60,
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

  return generateToken({ email: createdUser.email });
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
