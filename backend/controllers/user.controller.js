import User from "../models/userModel.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = await req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");   //get all users except loggedin user bcoz we don't want to see ourself on the sidebar --> ne ==not equals to
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error getting online users", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
