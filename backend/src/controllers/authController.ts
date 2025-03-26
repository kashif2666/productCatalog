import { Request, Response } from "express";
import * as authService from "../services/authService";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      status: 400,
      success: false,
      message: "All fields are required !",
    });
  }

  try {
    await authService.signup(name, email, password);
    res.status(201).json({
      status: 201,
      success: true,
      message: "User registered successfully !",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, success: true, message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: 400,
      success: false,
      message: "All fields are required !",
    });
  }

  try {
    const result = await authService.login(email, password);
    if (!result) {
      res
        .status(401)
        .json({ status: 401, success: false, message: "Invalid Credentials" });
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

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ status: 200, success: true, message: "Logout successfully !" });
};

export const authCheck = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ status: 200, success: true, user: req.user });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, success: false, message: "Internal Server Error" });
  }
};
