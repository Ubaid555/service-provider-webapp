// import mongoose from "mongoose";

// const connectToMongoDB = async ()=>{
//     try {
//         await mongoose.connect(process.env.MONOGO_DB_URL);
//         console.log("Connected To  Mongo Db")
        
//     } catch (error) {
//         console.log("Error Connecting to MongoDb",error.message);
//     }
// }

// export default connectToMongoDB

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


