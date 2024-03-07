import mongoose from "mongoose";

const connectToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database", error.message);
    }
}

export default connectToDb;