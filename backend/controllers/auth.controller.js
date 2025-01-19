import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", // CSRF attacks
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });

    // authenticate
    const token = generateToken(user._id);
    setCookie(res, token);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Await the user object
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id);
      setCookie(res, token);

      return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token,
        role: user.role,
      });
    } else {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const logout = async (res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ message: "User not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const newToken = generateToken(decoded.userId);
    setCookie(res, newToken);
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Here before entering this function the request is going through the
// protectRoute middleware which is checking if the user is authenticated
// if the user is present it adds the user object to the request object
// so we can access the user object from the request object inside this function
// and return the user object as a response
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { name, profileImage } = req.body;
    
    

    let cloudinaryResponse = null;
    if (profileImage) {
      cloudinaryResponse = await cloudinary.uploader.upload(profileImage, {
        folder: "profiles",
      });
      user.profilePicture = cloudinaryResponse.secure_url;
    } else {
      user.profilePicture = user.profilePicture;
    }

    if (name!==user.name) {
      user.name = name;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
