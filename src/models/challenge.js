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
    // image: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
); // department, id, image, price, productDescription, productName
const challenge = mongoose.models.challenge || mongoose.model("challenge", challengeSchema);
export default challenge;
