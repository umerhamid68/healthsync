import { useState } from "react";

const HabitForm = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [category, setCategory] = useState("Health"); // Default category
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !frequency || !startDate || !category) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    try {
      const response = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, frequency, startDate, category }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add habit");
      }

      const data = await response.json();
      setSuccess(data.message);
      setError("");
      setName("");
      setFrequency("daily");
      setStartDate("");
      setCategory("Health");
    } catch (error) {
      setError(error.message || "Something went wrong.");
      setSuccess("");
    }
  };

  return (
    <div>
      <h2>Create a New Habit</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Habit Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter habit name"
          />
        </div>
        <div>
          <label>Frequency:</label>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Health">Health</option>
            <option value="Productivity">Productivity</option>
            <option value="Learning">Learning</option>
          </select>
        </div>
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
};

export default HabitForm;
