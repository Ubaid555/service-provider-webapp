import mongoose from "mongoose";

const connectToMongoDB = () => {
  mongoose.connect('mongodb://127.0.0.1/FYP', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
};

export default connectToMongoDB;


