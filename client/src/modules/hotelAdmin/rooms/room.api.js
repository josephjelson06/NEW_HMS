import axios from "axios";

export const getRooms = async (token) => {
  const res = await axios.get("/api/hotel/rooms", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createRoom = async (token, payload) => {
  const res = await axios.post(
    "/api/hotel/rooms",
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
