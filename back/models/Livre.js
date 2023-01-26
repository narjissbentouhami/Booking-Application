import mongoose from "mongoose";
const LivreSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    livreNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
  },
  { timestamps: true }
);

export default mongoose.model("Livre", LivreSchema);
