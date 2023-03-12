import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

interface SignUpBody {
  userName: string;
  email?: string;
  password?: string;
}

interface LoginBody {
  username?: string;
  password?: string;
}

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authUser = req.session.userId;
  try {
    if (!authUser) {
      throw createHttpError(401, "User not authenticated!");
    }
    const user = await UserModel.findById(authUser).select("+email").exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!userName || !email || !passwordRaw) {
      throw createHttpError(400, "parameters missing!");
    }

    const excitingUserName = await UserModel.findOne({
      userName: userName,
    }).exec();
    if (excitingUserName) {
      throw createHttpError(409, "Username already taken!");
    }
    const excitingEmail = await UserModel.findOne({ email: email }).exec();
    if (excitingEmail) {
      throw createHttpError(409, "Email address already taken!");
    }

    const passHash = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      userName: userName,
      email: email,
      password: passHash,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const userName = req.body.username;
  const password = req.body.password;
  console.log(userName, password);

  try {
    if (!userName || !password) {
      throw createHttpError(400, "Parameters missing!");
    }

    const user = await UserModel.findOne({ userName })
      .select("+password +email")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid credentials user");
    }

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.sendStatus(200);
    }
  });
};
