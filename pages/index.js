// import HabitForm from "../components/habits/HabitForm";

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Habit Tracker</h1>
//       <HabitForm />
//     </div>
//   );
// };

// export default HomePage;



import Dashboard from "@/components/dashboard/Dashboard";
import { fetchAllHabits } from "@/helpers/habit-utils";
import Link from "next/link";

function HomePage({ habits }) {
  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      {/* Button to redirect to the habit creation page */}
      <div style={{ marginBottom: "20px" }}>
        <Link href="/AddHabit">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Add a New Habit
          </button>
        </Link>
      </div>
      <Dashboard habits={habits} />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch all habits directly from the helper (which accesses the database)
  const habits = await fetchAllHabits();
  return {
    props: {
      habits,
    },
  };
}

export default HomePage;
