import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//* REGISTER USER */
export const register = async (req, res) => {
  console.log(req.body);
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      picturePath
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: passwordHash,
      picturePath,
      friends : [],
      viewedProfile: 0,
      impressions: 0,
    });
    
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//* LOGGING IN
export const login = async (req, res) => {
  console.log("Aniga waaye");
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};