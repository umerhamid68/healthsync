// import { useState } from "react";
// import styles from "./CategorySearch.module.css";

// export default function CategorySearch({ categories, onSearch }) {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (event) => {
//     event.preventDefault();
//     const filteredCategories = categories.filter((category) =>
//       category.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     onSearch(filteredCategories); // Pass filtered results to parent
//   };

//   return (
//     <form className={styles.form} onSubmit={handleSearch}>
//       <div className={styles.control}>
//         <label htmlFor="search">Search Categories</label>
//         <input
//           id="search"
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Enter category name"
//         />
//       </div>
//       <button type="submit">Search</button>
//     </form>
//   );
// }






import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./CategorySearch.module.css";

export default function CategorySearch({ categories, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (query) => {
    const filteredCategories = categories.filter((category) =>
        category.toLowerCase().includes(query.toLowerCase())
      );
      onSearch(filteredCategories); // Pass filtered results to parent
  };
  // Dynamically filter categories as user types
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query); // Dynamically update results
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if an exact match exists for the search query
    const exactMatch = categories.find(
      (category) => category.toLowerCase() === searchQuery.toLowerCase()
    );

    if (exactMatch) {
      // Redirect to the category page
      router.push(`/categories/${exactMatch}`);
    } else {
      // No exact match; fallback to filtering
        handleSearch(searchQuery);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.control}>
        <label htmlFor="search" className={styles.label}>
          Search Categories
        </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={handleInputChange} // Dynamically update results
          placeholder="Enter category name"
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}
