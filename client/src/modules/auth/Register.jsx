import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth.api";
import { useAuth } from "../../app/authContext";
import { getRedirectPath } from "../../utils/authRedirect";

const Register = () => {
    const navigate = useNavigate();
    const { setAuthData, isAuthenticated, user } = useAuth();

    const [form, setForm] = useState({
        hotelName: "",
        hotelSlug: "",
        adminEmail: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            navigate(getRedirectPath(user), { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await register(form);
            setAuthData(data);
            navigate(getRedirectPath(data.user), { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    // Don't render if authenticated
    if (isAuthenticated) {
        return null;
    }

    return (
        <div style={{ maxWidth: 400, margin: "100px auto", padding: 24 }}>
            <h1>Register Hotel</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>Hotel Name</label>
                    <input
                        name="hotelName"
                        value={form.hotelName}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Hotel Slug</label>
                    <input
                        name="hotelSlug"
                        value={form.hotelSlug}
                        onChange={handleChange}
                        placeholder="e.g. grand-hotel"
                        required
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Admin Email</label>
                    <input
                        name="adminEmail"
                        type="email"
                        value={form.adminEmail}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%", padding: 12, cursor: "pointer" }}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            <p style={{ marginTop: 16, textAlign: "center" }}>
                Already have an account?{" "}
                <a href="/login" style={{ color: "blue" }}>
                    Login
                </a>
            </p>
        </div>
    );
};

export default Register;

