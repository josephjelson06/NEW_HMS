import { useParams } from "react-router-dom";
import { useAuth } from "../../app/authContext";

const HotelAdminHome = () => {
    const { hotelSlug } = useParams();
    const { user, logout } = useAuth();

    return (
        <div style={{ padding: 24 }}>
            <h1>Hotel Admin Dashboard</h1>
            <p>Hotel: {hotelSlug}</p>
            <p>Welcome, {user?.email}</p>
            <p>Role: {user?.role}</p>
            <button onClick={logout} style={{ marginTop: 16 }}>
                Logout
            </button>
        </div>
    );
};

export default HotelAdminHome;
