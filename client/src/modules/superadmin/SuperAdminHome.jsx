import { useEffect, useState } from "react";
import { useAuth } from "../../app/authContext";
import { getSuperAdminDashboard } from "./superAdmin.api";

const SuperAdminHome = () => {
    const { token, user, logout } = useAuth();

    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getSuperAdminDashboard(token);
                setDashboard(data);
            } catch (err) {
                console.error("SuperAdmin dashboard error:", err);
                setError("Failed to load SuperAdmin dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [token]);

    if (loading) {
        return <h2>Loading SuperAdmin dashboard...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div style={{ padding: 24 }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>SuperAdmin Dashboard</h1>
                <div>
                    <span style={{ marginRight: 16 }}>
                        {user?.email} ({user?.role})
                    </span>
                    <button onClick={logout}>Logout</button>
                </div>
            </header>

            <h2>Total Hotels: {dashboard?.totalHotels ?? 0}</h2>

            <hr />

            <h3>Hotels</h3>

            {dashboard?.hotels?.length === 0 ? (
                <p>No hotels registered yet.</p>
            ) : (
                <ul>
                    {dashboard?.hotels?.map((hotel) => (
                        <li key={hotel.id}>
                            <strong>{hotel.name}</strong>
                            <br />
                            Slug: {hotel.slug}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SuperAdminHome;
