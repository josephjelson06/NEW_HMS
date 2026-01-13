import axios from "axios";

export const getGuests = async (token) => {
  const res = await axios.get("/api/hotel/guests", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createGuest = async (token, payload) => {
  const res = await axios.post("/api/hotel/guests", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
