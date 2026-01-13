import { useEffect, useState } from "react";
import { useAuth } from "../../../app/authContext";
import { getBookings, createBooking, checkInBooking, checkOutBooking } from "./booking.api";
import { getGuests } from "../guests/guest.api";
import { getRooms } from "../rooms/room.api";

const BookingsPage = () => {
    const { token } = useAuth();

    const [bookings, setBookings] = useState([]);
    const [guests, setGuests] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        guestId: "",
        roomId: "",
        checkIn: "",
        checkOut: "",
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [bookingData, guestData, roomData] = await Promise.all([
                getBookings(token),
                getGuests(token),
                getRooms(token),
            ]);
            setBookings(bookingData);
            setGuests(guestData);
            setRooms(roomData);
        } catch (err) {
            setError("Failed to load booking data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckIn = async (bookingId) => {
        try {
            await checkInBooking(token, bookingId);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Check-in failed");
        }
    };

    const handleCheckOut = async (bookingId) => {
        try {
            await checkOutBooking(token, bookingId);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Check-out failed");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.guestId || !form.roomId || !form.checkIn || !form.checkOut) {
            alert("All fields are required");
            return;
        }

        try {
            await createBooking(token, form);
            setForm({
                guestId: "",
                roomId: "",
                checkIn: "",
                checkOut: "",
            });
            fetchData();
        } catch (err) {
            if (err.response?.status === 409) {
                alert("Room already booked for selected dates");
            } else {
                alert("Failed to create booking");
            }
        }
    };

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Bookings</h2>

            {/* Create Booking */}
            <form onSubmit={handleSubmit}>
                <select
                    name="guestId"
                    value={form.guestId}
                    onChange={handleChange}
                >
                    <option value="">Select Guest</option>
                    {guests.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.firstName} {g.lastName} ({g.phone})
                        </option>
                    ))}
                </select>

                <select
                    name="roomId"
                    value={form.roomId}
                    onChange={handleChange}
                >
                    <option value="">Select Room</option>
                    {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                            Room {r.roomNumber}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    name="checkIn"
                    value={form.checkIn}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="checkOut"
                    value={form.checkOut}
                    onChange={handleChange}
                />

                <button type="submit">Create Booking</button>
            </form>

            <hr />

            {/* Booking List */}
            {bookings.length === 0 ? (
                <p>No bookings yet.</p>
            ) : (
                <ul>
                    {bookings.map((b) => (
                        <li key={b.id}>
                            <strong>
                                {b.guest.firstName} {b.guest.lastName}
                            </strong>
                            <br />
                            Room: {b.room.roomNumber}
                            <br />
                            {new Date(b.checkIn).toLocaleDateString()} →{" "}
                            {new Date(b.checkOut).toLocaleDateString()}
                            <br />
                            Status: <b>{b.status}</b>
                            <br />

                            {/* ACTIONS */}
                            {b.status === "BOOKED" && (
                                <button onClick={() => handleCheckIn(b.id)}>
                                    Check In
                                </button>
                            )}

                            {b.status === "CHECKED_IN" && (
                                <button onClick={() => handleCheckOut(b.id)}>
                                    Check Out
                                </button>
                            )}
                        </li>
                    ))}
                </ul>

            )}
        </div>
    );
};

export default BookingsPage;
