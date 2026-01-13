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


export const checkInBooking = async (token, bookingId) => {
    const res = await axios.patch(
        `/api/hotel/bookings/${bookingId}/check-in`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res.data;
}

export const checkOutBooking = async (token, bookingId) => {
    const res = await axios.patch(
        `/api/hotel/bookings/${bookingId}/check-out`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res.data;
}