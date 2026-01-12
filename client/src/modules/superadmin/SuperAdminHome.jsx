import { useAuth } from "../../app/authContext";

const SuperAdminHome = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{ padding: 24 }}>
            <h1>Super Admin Dashboard</h1>
            <p>Welcome, {user?.email}</p>
            <p>Role: {user?.role}</p>
            <button onClick={logout} style={{ marginTop: 16 }}>
                Logout
            </button>
        </div>
    );
};

export default SuperAdminHome;
