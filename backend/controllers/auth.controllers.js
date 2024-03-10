import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateJWT from "../utils/generateJWT.js";
export const signup = async (req, res) => {
  // console.log(req.body);
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password and Confirm Password are not the same" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already in use" });
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Avatar   https://avatar-placeholder.iran.liara.run/ using this api
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
        //If new User comes generate it's JWT token   
      generateJWT(newUser._id, res);  
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    }else{
        res.status(400).json({error: "Invalid user data"})
    }
  } catch (error) {
    console.log("Error in signup", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async(req, res) => {
    const {username, password} = req.body;
 try {
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password ||"");

    if(!user || !isPasswordCorrect) {
        return res.status(404).json({error: "Username or Password incorrect"});
    }

    generateJWT(user._id, res);

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
    });
 } catch (error) {
    console.log("Error in login", error.message);
    res.status(500).json({ error: "Internal Server Error" });
 }
};

export const logout = (req, res) => {
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
