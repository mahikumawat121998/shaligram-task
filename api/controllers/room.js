import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
export const room = async (req, res, next) => {
    console.log("req",req);
  try {
    const newRoom = new Room({
      ...req.body,     
    });
    await newRoom.save();
    res.status(200).send("Room Created Successfully..!!");
  } catch (err) {
    next(err);
  }
};
