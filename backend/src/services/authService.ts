import jwt from 'jsonwebtoken';
import User from '../models/User';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const registerUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error('Please provide all required fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({ email, password });

  if (user) {
    return {
      user: {
        _id: user._id,
        email: user.email,
      },
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid user data');
  }
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    return {
      user: {
        _id: user._id,
        email: user.email,
      },
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};