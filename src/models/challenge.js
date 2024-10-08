import mongoose, { Schema } from "mongoose";
const challengeSchema = new Schema(
  {
    challengeName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    challengeDescription: {
      type: String,
    },
    level:{
      type:String,
      // required: true,
    },
    image: {
      type: String,
    },
    status:{
      type: String
    }
  },
  {
    timestamps: true,
  }
); // department, id, image, price, productDescription, productName
const challenge = mongoose.models.challenge || mongoose.model("challenge", challengeSchema);
export default challenge;
