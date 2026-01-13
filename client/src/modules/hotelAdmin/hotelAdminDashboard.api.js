import axios from "axios";

export const getHotelDashboard = async (token) => {
  const response = await axios.get("/api/hotel/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
