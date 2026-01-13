import { useEffect, useState } from "react";
import { useAuth } from "../../../app/authContext";
import {
  getRoomCategories,
  createRoomCategory,
} from "./roomCategory.api";

const RoomCategoryPage = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    basePrice: "",
    capacity: "",
    amenities: "",
  });

  const fetchCategories = async () => {
    setLoading(true);
    const data = await getRoomCategories(token);
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRoomCategory(token, form);
    setForm({ name: "", basePrice: "", capacity: "", amenities: "" });
    fetchCategories();
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div>
      <h2>Room Categories</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Base Price"
          value={form.basePrice}
          onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
        />
        <input
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />
        <input
          placeholder='Amenities JSON (e.g. ["AC","WiFi"])'
          value={form.amenities}
          onChange={(e) => setForm({ ...form, amenities: e.target.value })}
        />
        <button type="submit">Create Category</button>
      </form>

      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            {c.name} — ₹{c.basePrice} — Capacity {c.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomCategoryPage;
