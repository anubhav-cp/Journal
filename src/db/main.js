import mongoose from "mongoose";

const connectDb = async() => {
    try{
    const connectionInstance = await mongoose.connect("mongodb://localhost:27017/Journal")
    console.log("Database Connection Successfull!")
}
    catch(err) {
        console.log("Database Connection Failed!", err)
    }
}

export default connectDb