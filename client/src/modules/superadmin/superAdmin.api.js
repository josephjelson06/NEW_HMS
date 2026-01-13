import axios from "axios";

export const getSuperAdminDashboard = async (token) => {
  const response = await axios.get("/api/superadmin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
