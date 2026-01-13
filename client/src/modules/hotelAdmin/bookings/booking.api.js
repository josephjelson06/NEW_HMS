import axios from "axios";

export const getBookings = async (token) => {
  const res = await axios.get("/api/hotel/bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createBooking = async (token, payload) => {
  const res = await axios.post("/api/hotel/bookings", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
