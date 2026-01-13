import { useEffect, useState } from "react";
import { useAuth } from "../../../app/authContext";
import { getRooms, createRoom } from "./room.api";
import { getRoomCategories } from "../roomCategories/roomCategory.api";

const RoomsPage = () => {
  const { token } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    categoryId: "",
    roomNumber: "",
    floor: "",
    status: "AVAILABLE",
  });

  const fetchData = async () => {
    setLoading(true);
    const [roomsData, categoriesData] = await Promise.all([
      getRooms(token),
      getRoomCategories(token),
    ]);
    setRooms(roomsData);
    setCategories(categoriesData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRoom(token, form);
    setForm({
      categoryId: "",
      roomNumber: "",
      floor: "",
      status: "AVAILABLE",
    });
    fetchData();
  };

  if (loading) return <p>Loading rooms...</p>;

  return (
    <div>
      <h2>Rooms</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={form.categoryId}
          onChange={(e) =>
            setForm({ ...form, categoryId: e.target.value })
          }
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Room Number"
          value={form.roomNumber}
          onChange={(e) =>
            setForm({ ...form, roomNumber: e.target.value })
          }
        />

        <input
          placeholder="Floor"
          value={form.floor}
          onChange={(e) =>
            setForm({ ...form, floor: e.target.value })
          }
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
        </select>

        <button type="submit">Create Room</button>
      </form>

      <ul>
        {rooms.map((r) => (
          <li key={r.id}>
            Room {r.roomNumber} ({r.category.name}) — {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsPage;
