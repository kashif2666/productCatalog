import { Request, Response } from "express";
import * as authService from "../services/authService";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required" });
    return;
  }

  try {
    const result = await authService.signup(username, email, password);
    console.log(result);
    if (!result) {
      res.status(401).json({ success: false, message: "Signup failed" });
      return;
    }

    // Set cookie
    res.cookie("token", result?.token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 3600000, // 1 hour
    });

    res.status(201).json({ success: true, user: result?.user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: 400,
      success: false,
      message: "All fields are required !",
    });
    return;
  }

  try {
    const result = await authService.login(email, password);
    console.log(result);
    if (!result) {
      res
        .status(401)
        .json({ status: 401, success: false, message: "Invalid Credentials" });
      return;
    }

    res.cookie("token", result?.token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({ status: 200, success: true, user: result?.user });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, success: true, message: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ status: 200, success: true, message: "Logout successfully !" });
};

export const authCheck = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ status: 200, success: true, user: req.user });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, success: false, message: "Internal Server Error" });
  }
};
