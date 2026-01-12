import { Routes, Route } from "react-router-dom";
import Login from "../modules/auth/Login";
import SuperAdminHome from "../modules/superadmin/SuperAdminHome";
import HotelAdminHome from "../modules/hotelAdmin/HotelAdminHome";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => (
    <Routes>
        <Route path="/login" element={<Login />} />

        <Route
            path="/superadmin"
            element={
                <ProtectedRoute>
                    <SuperAdminHome />
                </ProtectedRoute>
            }
        />

        <Route
            path="/admin/:hotelSlug"
            element={
                <ProtectedRoute>
                    <HotelAdminHome />
                </ProtectedRoute>
            }
        />
    </Routes>
);

export default Router;
