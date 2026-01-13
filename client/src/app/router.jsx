import { Routes, Route } from "react-router-dom";
import Login from "../modules/auth/Login";
import Register from "../modules/auth/Register";
import SuperAdminHome from "../modules/superadmin/SuperAdminHome";
import HotelAdminHome from "../modules/hotelAdmin/HotelAdminHome";
import RoomCategoryPage from "../modules/hotelAdmin/roomCategories/roomCategoryPage";
import RoomsPage from "../modules/hotelAdmin/rooms/RoomsPage";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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

        <Route
            path="/admin/:hotelSlug/room-categories"
            element={
                <ProtectedRoute>
                    <RoomCategoryPage />
                </ProtectedRoute>
            }
        />

        <Route
            path="/admin/:hotelSlug/rooms"
            element={
                <ProtectedRoute>
                    <RoomsPage />
                </ProtectedRoute>
            }
        />
    </Routes>
);

export default Router;

