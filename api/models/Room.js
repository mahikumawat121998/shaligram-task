import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    bookingType: {
      type: String,
      required: true,
    },
    bookingSlot: {
      type: String,
      required: true,
    },
    bookingTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
