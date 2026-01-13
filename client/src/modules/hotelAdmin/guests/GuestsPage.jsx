import { useEffect, useState } from "react";
import { useAuth } from "../../../app/authContext";
import { getGuests, createGuest } from "./guest.api";

const GuestsPage = () => {
  const { token } = useAuth();

  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    idType: "",
    idNumber: "",
  });

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const data = await getGuests(token);
      setGuests(data);
    } catch (err) {
      setError("Failed to load guests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createGuest(token, form);
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        idType: "",
        idNumber: "",
      });
      fetchGuests();
    } catch (err) {
      alert("Failed to create guest");
    }
  };

  if (loading) return <p>Loading guests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Guests</h2>

      {/* Create Guest */}
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email (optional)"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="idType"
          placeholder="ID Type (optional)"
          value={form.idType}
          onChange={handleChange}
        />

        <input
          name="idNumber"
          placeholder="ID Number (optional)"
          value={form.idNumber}
          onChange={handleChange}
        />

        <button type="submit">Add Guest</button>
      </form>

      <hr />

      {/* Guest List */}
      {guests.length === 0 ? (
        <p>No guests added yet.</p>
      ) : (
        <ul>
          {guests.map((g) => (
            <li key={g.id}>
              <strong>
                {g.firstName} {g.lastName}
              </strong>
              <br />
              Phone: {g.phone}
              {g.email && (
                <>
                  <br />
                  Email: {g.email}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestsPage;
