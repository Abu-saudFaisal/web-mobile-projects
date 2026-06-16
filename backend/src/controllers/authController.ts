import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({
        message: "Username must be between 3 and 20 characters",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
      },
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Please provide username and password",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
      },
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  return res.status(200).json({
    user: req.user,
  });
};