import { useEffect, useState } from "react";
import { useAuth } from "../../app/authContext";
import { getHotelDashboard } from "./hotelAdminDashboard.api";

const HotelAdminHome = () => {
    const { token, user, logout } = useAuth();

    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getHotelDashboard(token);
                setDashboard(data);
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                setError("Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, [token]);

    if (loading) {
        return <h2>Loading dashboard...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div style={{ padding: 24 }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Hotel Dashboard</h1>
                <div>
                    <span style={{ marginRight: 16 }}>
                        {user?.email} ({user?.role})
                    </span>
                    <button onClick={logout}>Logout</button>
                </div>
            </header>

            <h2>{dashboard?.hotel?.name}</h2>
            <p>Slug: {dashboard?.hotel?.slug}</p>
            <hr />

            <h3>Stats</h3>
            <ul>
                <li>Rooms: {dashboard?.stats?.rooms ?? 0}</li>
                <li>Bookings: {dashboard?.stats?.bookings ?? 0}</li>
                <li>Guests: {dashboard?.stats?.guests ?? 0}</li>
            </ul>
        </div>
    );
};

export default HotelAdminHome;
