import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
interface SignUpBody {
  userName: string;
  email?: string;
  password?: string;
}
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

    const exictingUserName = await UserModel.findOne({
      userName: userName,
    }).exec();
    if (exictingUserName) {
      throw createHttpError(409, "Username already taken!");
    }
    const exictingEmail = await UserModel.findOne({ email: email }).exec();
    if (exictingEmail) {
      throw createHttpError(409, "Email address already taken!");
    }

    


  } catch (error) {
    next(error);
  }
};
