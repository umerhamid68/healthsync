// import { useState } from "react";
// import styles from "./HabitSort.module.css";

// export default function HabitSort({ habits, onSort }) {
//   const [sortOrder, setSortOrder] = useState("asc"); // Default to ascending order

//   const handleSortChange = (event) => {
//     const selectedOrder = event.target.value;
//     setSortOrder(selectedOrder);

//     // Sort the habits based on the selected order
//     const sortedHabits = [...habits].sort((a, b) => {
//       if (selectedOrder === "asc") return a.streakCount - b.streakCount;
//       if (selectedOrder === "desc") return b.streakCount - a.streakCount;
//       return 0;
//     });

//     // Pass the sorted habits back to the parent
//     onSort(sortedHabits);
//   };

//   return (
//     <div className={styles.sort}>
//       <label htmlFor="sort" className={styles.label}>
//         Sort by Streak Count:
//       </label>
//       <select
//         id="sort"
//         value={sortOrder}
//         onChange={handleSortChange}
//         className={styles.select}
//       >
//         <option value="asc">Increasing</option>
//         <option value="desc">Decreasing</option>
//       </select>
//     </div>
//   );
// }





import { useState } from "react";
import styles from "./HabitSort.module.css";

export default function HabitSort({ habits, onSort }) {
  const [sortOrder, setSortOrder] = useState("asc"); // Default to ascending order

  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Update sort order when the dropdown changes
  };

  const applySort = () => {
    // Sort the habits based on the selected order
    const sortedHabits = [...habits].sort((a, b) => {
      if (sortOrder === "asc") return a.streakCount - b.streakCount;
      if (sortOrder === "desc") return b.streakCount - a.streakCount;
      return 0;
    });

    onSort(sortedHabits); // Pass the sorted habits back to the parent
  };

  return (
    <div className={styles.sort}>
      <label htmlFor="sort" className={styles.label}>
        Sort by Streak Count:
      </label>
      <select
        id="sort"
        value={sortOrder}
        onChange={handleSortChange}
        className={styles.select}
      >
        <option value="asc">Increasing</option>
        <option value="desc">Decreasing</option>
      </select>
      <button onClick={applySort} className={styles.button}>
        Apply
      </button>
    </div>
  );
}
