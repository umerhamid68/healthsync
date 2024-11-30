import Link from "next/link";
import HabitList from "@/components/habits/HabitList";
import { fetchHabitsByCategory, fetchCategories } from "@/helpers/habit-utils";

function CategoryPage({ habits, category }) {
  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>Habits for Category: {category}</h1>
      {habits.length > 0 ? (
        <HabitList habits={habits} />
      ) : (
        <p>No habits found for this category.</p>
      )}
      <br />
      <Link href="/categories">
        Back to Categories
      </Link>
    </div>
  );
}

export async function getStaticProps(context) {
  const { category } = context.params;

  
    const habits = await fetchHabitsByCategory(category); // Fetch habits for the category
    return {
      props: {
        habits,
        category,
      },
      revalidate: 30, // Revalidate every 30 seconds
    };
  
}

export async function getStaticPaths() {
  
    const categories = await fetchCategories(); // Fetch all categories
    const paths = categories.map((category) => ({
      params: { category },
    }));

    return {
      paths,
      fallback: "blocking", // Generate page only when requested if not pre-built
    };
}

export default CategoryPage;
