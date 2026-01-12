import axios from "axios";

export const login = async (email, password) => {
    const response = await axios.post("/api/auth/login", {
        email,
        password,
    });

    return response.data;
};

export const register = async ({
    hotelName,
    hotelSlug,
    adminEmail,
    password,
}) => {
    const response = await axios.post("/api/auth/register", {
        hotelName,
        hotelSlug,
        adminEmail,
        password,
    });
    return response.data;
}