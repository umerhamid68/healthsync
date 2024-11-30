import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function HabitPage() {
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
  
    const fetchHabit = async () => {
      try {
        const response = await fetch(`/api/habits/${id}`);
        if (!response.ok) throw new Error("Failed to fetch habit");
        const data = await response.json();
        setHabit(data.habit);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred.");
        setLoading(false);
      }
    };
  
    fetchHabit();
  }, [id]);

  // Update streak count dynamically
  const handleComplete = async () => {
    try {
      console.log("Sending PUT request to API:", `/api/habits/${habit.id}`);

      const response = await fetch(`/api/habits/${habit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      console.log("API Response Status:", response.status);

      if (!response.ok) throw new Error("Failed to update streak");

      // Get the updated streak count from the response
      const data = await response.json();

      // Update the habit object directly using the current streak count from API response
      console.log("Updated Streak Count:", data.habit.streakCount);
      setHabit((prevHabit) => ({
        ...prevHabit,
        streakCount: data.habit.streakCount,  // Use updated streak count
      }));
    } catch (err) {
      console.error("Error updating streak:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>{habit.name}</h1>
      <p>Frequency: {habit.frequency}</p>
      <p>Category: {habit.category}</p>
      <p>Start Date: {new Date(habit.startDate).toLocaleDateString()}</p>
      <p>Current Streak: {habit.streakCount}</p>
      <button onClick={handleComplete} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Mark as Complete
      </button>
      <br />
      <button onClick={() => router.push("/")} style={{ marginTop: "10px" }}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default HabitPage;
