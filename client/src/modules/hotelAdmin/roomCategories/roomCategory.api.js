import axios from "axios";

export const getRoomCategories = async (token) => {
  const res = await axios.get("/api/hotel/room-categories", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createRoomCategory = async (token, payload) => {
  const res = await axios.post(
    "/api/hotel/room-categories",
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
