import CategoriesList from "@/components/categories/CategoriesList";
import { fetchCategories } from "@/helpers/habit-utils";
import CategorySearch from "@/components/categories/CategorySearch";
import { useState } from "react";
function CategoriesPage({ categories }) {
    const [filteredCategories, setFilteredCategories] = useState(categories);
  
    return (
      <div style={{ textAlign: "center", fontFamily: "cursive" }}>
        <h1>Habit Categories</h1>
        <CategorySearch categories={categories} onSearch={setFilteredCategories} />
        <CategoriesList categories={filteredCategories} />
      </div>
    );
}

export async function getStaticProps() {
  // Fetch categories from the database
  const data = await fetchCategories();
  // Return categories for SSG
  return {
    props: {
      categories: data,
    },
    revalidate: 60, // Revalidate every 30 seconds
  };
}

export default CategoriesPage;
