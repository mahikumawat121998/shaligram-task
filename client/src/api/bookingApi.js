import axios from "axios";

const booking = (payload) => {
  console.log("payload", payload.values);
  return axios.post(`http://localhost:8800/api/room/room`, payload.values);
};

const BookingService = {
  booking,
};

export default BookingService;
