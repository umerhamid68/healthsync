// // import { useState } from "react";
// // import styles from "./HabitSearch.module.css";

// // export default function HabitSearch({ habits, onSearch }) {
// //   const [searchQuery, setSearchQuery] = useState("");

// //   const handleSearch = (event) => {
// //     event.preventDefault();
// //     const filteredHabits = habits.filter((habit) =>
// //       habit.name.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //     onSearch(filteredHabits); 
// //   };

// //   return (
// //     <form className={styles.form} onSubmit={handleSearch}>
// //       <div className={styles.control}>
// //         <label htmlFor="search">Search Habits</label>
// //         <input
// //           id="search"
// //           type="text"
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //           placeholder="Enter habit name"
// //         />
// //       </div>
// //       <button type="submit">Search</button>
// //     </form>
// //   );
// // }




// import { useState } from "react";
// import styles from "./HabitSearch.module.css";

// export default function HabitSearch({ habits, onSearch }) {
//   const [searchQuery, setSearchQuery] = useState("");

//   // Dynamically filter habits as user types
//   const handleSearch = (query) => {
//     const filteredHabits = habits.filter((habit) =>
//       habit.name.toLowerCase().includes(query.toLowerCase())
//     );
//     onSearch(filteredHabits); // Pass filtered results to parent
//   };

//   const handleInputChange = (event) => {
//     const query = event.target.value;
//     setSearchQuery(query);
//     handleSearch(query); // Dynamically update results
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     handleSearch(searchQuery); // Explicit search on button click
//   };

//   return (
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <div className={styles.control}>
//         <label htmlFor="search" className={styles.label}>
//           Search Habits
//         </label>
//         <input
//           id="search"
//           type="text"
//           value={searchQuery}
//           onChange={handleInputChange} // Trigger search as user types
//           placeholder="Enter habit name"
//           className={styles.input}
//         />
//       </div>
//       <button type="submit" className={styles.button}>
//         Search
//       </button>
//     </form>
//   );
// }








import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./HabitSearch.module.css";

export default function HabitSearch({ habits, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Dynamically filter habits as user types
  const handleSearch = (query) => {
    const filteredHabits = habits.filter((habit) =>
      habit.name.toLowerCase().includes(query.toLowerCase())
    );
    onSearch(filteredHabits); // Pass filtered results to parent
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query); // Dynamically update results
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if an exact match exists for the search query
    const exactMatch = habits.find(
      (habit) => habit.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (exactMatch) {
      // Redirect to the individual habit page
      router.push(`/habits/${exactMatch.id}`);
    } else {
      // No exact match; fallback to filtering
      handleSearch(searchQuery);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.control}>
        <label htmlFor="search" className={styles.label}>
          Search Habits
        </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={handleInputChange} // Trigger search as user types
          placeholder="Enter habit name"
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}
