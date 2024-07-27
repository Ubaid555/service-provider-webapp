import mongoose from "mongoose";

const serviceDataSchema = new mongoose.Schema(
  {
    imgsrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    sname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Sdata = mongoose.model("Sdata", serviceDataSchema);
export default Sdata;
