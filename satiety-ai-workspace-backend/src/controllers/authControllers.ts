import { Request, Response } from "express";

import { registerUser } from "../services/authServices";
import { loginUser } from "../services/authServices";

export async function register(
  req: Request,
  res: Response
) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    const data = await registerUser(
      name,
      email,
      password
    );

    return res.status(201).json({
      success: true,
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
      user: {
        id: data.user.id,
        name: data.user.user_metadata.name,
        email: data.user.email,
      },
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

export async function login(
  req: Request,
  res: Response
) {
  try {
    const { email, password } = req.body;

    const data = await loginUser(
      email,
      password
    );

    return res.json({
      success: true,
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
      user: {
        id: data.user.id,
        name: data.user.user_metadata.name,
        email: data.user.email,
      },
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}
