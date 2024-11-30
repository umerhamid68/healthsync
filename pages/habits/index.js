import Dashboard from "@/components/dashboard/Dashboard";
import HabitList from "@/components/habits/HabitList";
import HabitSearch from "@/components/habits/HabitSearch";
import HabitSort from "@/components/habits/HabitSort";
import { fetchAllHabits } from "../../helpers/habit-utils";
import { useState } from "react";
function HabitsPage({ habits }) {
  const [filteredHabits, setFilteredHabits] = useState(habits);
  
  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>All Habits</h1>
      <HabitSearch habits={habits} onSearch={setFilteredHabits} />
      <HabitSort habits={filteredHabits} onSort={setFilteredHabits} />
      <HabitList habits={filteredHabits} />
    </div>
  );
}

export async function getServerSideProps() {
  const habits = await fetchAllHabits();
  return {
    props: {
      habits,
    },
  };
}

export default HabitsPage;
