// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/router";
// // // import HabitList from "@/components/habits/HabitList";
// // // import useSWR from "swr";

// // // function FilteredHabitsPage() {
// // //   const router = useRouter();
// // //   const { slug } = router.query;  // slug will contain the year, month, and optionally day
// // //   const [filteredHabits, setFilteredHabits] = useState([]);

// // //   // Fetch all habits from API using useSWR
// // //   const fetcher = (url) => fetch(url).then((res) => res.json());
// // //   const { data, error } = useSWR("/api/habits", fetcher);

// // //   useEffect(() => {
// // //     if (data) {
// // //       // Extract habits from the fetched data
// // //       const habits = data.habits;

// // //       // Filter based on URL parameters (slug) - which may include year, month, and day
// // //       if (slug) {
// // //         const [year, month, day] = slug;

// // //         let filtered = habits;

// // //         if (year) {
// // //           filtered = filtered.filter(
// // //             (habit) => new Date(habit.date).getFullYear() === Number(year)
// // //           );
// // //         }

// // //         if (month) {
// // //           filtered = filtered.filter(
// // //             (habit) => new Date(habit.date).getMonth() + 1 === Number(month)
// // //           );
// // //         }

// // //         if (day) {
// // //           filtered = filtered.filter(
// // //             (habit) => new Date(habit.date).getDate() === Number(day)
// // //           );
// // //         }

// // //         setFilteredHabits(filtered);
// // //       }
// // //     }
// // //   }, [data, slug]);

// // //   if (error) {
// // //     return <p>Error loading habits</p>;
// // //   }

// // //   if (!data) {
// // //     return <p>Loading...</p>;
// // //   }

// // //   if (filteredHabits.length === 0) {
// // //     return <p>No habits found for the selected date</p>;
// // //   }

// // //   return (
// // //     <div style={{ textAlign: "center", fontFamily: "cursive" }}>
// // //       <h1>Filtered Habits</h1>
// // //       <HabitList habits={filteredHabits} />
// // //     </div>
// // //   );
// // // }

// // // export default FilteredHabitsPage;




// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import HabitList from "@/components/habits/HabitList";

// function FilteredHabitsPage() {
//   const router = useRouter();
//   const { slug } = router.query;  // `slug` will contain year, month, and possibly day
//   const [habits, setHabits] = useState([]);
//   const [filteredHabits, setFilteredHabits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Only run fetch and filtering logic when `slug` is available
//     if (!slug) return;

//     // Fetch all habits from API
//     const fetchHabits = async () => {
//       try {
//         const data = await fetch("/api/habits");
//         console.log(data);
//         const result = await response.json();
//         console.log("Fetched Habits:", result);
//         setHabits(data.habits);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     console.log(habits);
//     fetchHabits();
//   }, [slug]);  // Re-run this effect when `slug` changes

//   useEffect(() => {
//     if (slug && habits.length > 0) {
//       const [year, month, day] = slug;

//       let filtered = habits;

//       // Filter habits by year, month, and day
//       if (year) {
//         filtered = filtered.filter(
//           (habit) => new Date(habit.date).getFullYear() === Number(year)
//         );
//       }
//       console.log(filtered)
//       if (month) {
//         filtered = filtered.filter(
//           (habit) => new Date(habit.date).getMonth() + 1 === Number(month)
//         );
//       }
//       console.log(month);
//       console.log(day);
//       if (day) {
//         filtered = filtered.filter(
//           (habit) => new Date(habit.date).getDate() === Number(day)
//         );
//       }

//       setFilteredHabits(filtered);
//     }
//   }, [slug, habits]);  // Run filtering whenever `slug` or `habits` changes

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (filteredHabits.length === 0) return <p>No habits found for this filter.</p>;

//   return (
//     <div style={{ textAlign: "center", fontFamily: "cursive" }}>
//       <h1>Filtered Habits</h1>
//       <HabitList habits={filteredHabits} />
//     </div>
//   );
// }

// export default FilteredHabitsPage;


































// 'use client'
// import { useState, useEffect } from "react";
// import HabitList from "@/components/habits/HabitList";
// import { useRouter } from "next/router";
// import useSWR from "swr";

// // Fetcher function to get data from the API
// const fetcher = (url) => fetch(url).then((res) => res.json());

// function FilteredHabitsPage() {
//   const [habits, setHabits] = useState([]);
//   const router = useRouter();
//   const { slug } = router.query;

//   // Use SWR to fetch all habits from API
//   const { data, error } = useSWR("/api/habits", fetcher);

//   useEffect(() => {
//     if (data) {
//       console.log("Fetched habits:", data.habits); // Log to verify the data structure
//       setHabits(data.habits || []); // Set habits in state
//     }
//   }, [data]);

//   // If data is still loading
//   if (!data && !error) {
//     return <p>Loading...</p>;
//   }

//   // If there's an error fetching data
//   if (error) {
//     console.error("Error fetching habits:", error);
//     return <p>Failed to load habits</p>;
//   }

//   // If no habits data is found
//   if (habits.length === 0) {
//     return <p>No habits found for the selected month/day</p>;
//   }

//   // Handling the year and month from the query string
//   const [year, month] = slug; // Destructure the slug for year and month

//   const filteredHabits = habits.filter((habit) => {
//     const habitDate = new Date(habit.startDate);
//     return (
//       habitDate.getFullYear() === Number(year) &&
//       habitDate.getMonth() + 1 === Number(month)
//     );
//   });

//   if (isNaN(year) || isNaN(month)) {
//     return <p>Invalid year or month format</p>;
//   }

//   if (filteredHabits.length === 0) {
//     return <p>No habits found for this date</p>;
//   }

//   return (
//     <div style={{ textAlign: "center", fontFamily: "cursive" }}>
//       <h1>Filtered Habits</h1>
//       <HabitList habits={filteredHabits} />
//     </div>
//   );
// }

// export default FilteredHabitsPage;
















// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import HabitList from "@/components/habits/HabitList";

// function FilteredHabitsPage() {
//   const [habits, setHabits] = useState([]);
//   const [filteredHabits, setFilteredHabits] = useState([]);
//   const [error, setError] = useState(null);
//   const router = useRouter();
//   const { slug } = router.query; // Get the slug parameter from the URL

//   useEffect(() => {
//     // Fetch all habits from the API on component mount
//     const fetchHabits = async () => {
//       try {
//         const res = await fetch("/api/habits");
//         const data = await res.json();
//         console.log("Fetched habits:", data);
//         setHabits(data); // Set all fetched habits
//       } catch (err) {
//         setError("Failed to fetch habits");
//       }
//     };

//     fetchHabits();
//   }, []); // Only run once on mount

//   useEffect(() => {
//     // This useEffect is triggered when `slug` changes (i.e. when user navigates)
//     if (slug) {
//       const [year, month, day] = slug;

//       // Filter habits based on the year, month, and day from the URL
//       const filterHabitsByDate = () => {
//         const filtered = habits.filter((habit) => {
//           const habitDate = new Date(habit.startDate);
//           const habitYear = habitDate.getFullYear();
//           const habitMonth = habitDate.getMonth() + 1; // Months are 0-indexed
//           const habitDay = habitDate.getDate();

//           return (
//             (year && habitYear === parseInt(year)) &&
//             (month && habitMonth === parseInt(month)) &&
//             (day ? habitDay === parseInt(day) : true)
//           );
//         });
//         setFilteredHabits(filtered);
//       };

//       filterHabitsByDate();
//     }
//   }, [slug, habits]); // Run whenever `slug` or `habits` changes

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!filteredHabits.length) {
//     return <p>No habits found for the given date.</p>;
//   }

//   return (
//     <div style={{ textAlign: "center", fontFamily: "cursive" }}>
//       <h1>Filtered Habits</h1>
//       <HabitList habits={filteredHabits} />
//     </div>
//   );
// }

// export default FilteredHabitsPage;











import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HabitList from "@/components/habits/HabitList";

function FilteredHabitsPage() {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch("/api/habits");
        const data = await res.json();

        // Check if the habits property exists and is an array
        if (data && Array.isArray(data.habits)) {
          setHabits(data.habits); // Set all fetched habits
        } else {
          throw new Error("Fetched data does not contain habits array");
        }
      } catch (err) {
        setError("Failed to fetch habits");
        console.error(err);
      }
    };

    fetchHabits();
  }, []);

  useEffect(() => {
    if (slug && habits.length > 0) {
      // Destructure year, month, and day from the slug
      const [year, month, day] = slug;

      // Convert month to zero-indexed (e.g., "11" becomes 10)
      const targetMonth = month - 1;

      // Filter habits based on the year, month, and day from the URL
      const filterHabitsByDate = () => {
        const filtered = habits.filter((habit) => {
          const habitDate = new Date(habit.startDate);
          const habitYear = habitDate.getFullYear();
          const habitMonth = habitDate.getMonth(); // 0-indexed month
          const habitDay = habitDate.getDate() || undefined;

          // Compare the year, month, and day
          console.log(habitYear, habitMonth, habitDay);
          console.log(year, targetMonth, day);
          return habitYear === parseInt(year) && habitMonth === targetMonth && (!day || habitDay === parseInt(day));
        });

        setFilteredHabits(filtered); // Update the filtered habits state
      };

      filterHabitsByDate();
    }
  }, [slug, habits]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!filteredHabits || filteredHabits.length === 0) {
    return <p>No habits found for this date.</p>;
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>Filtered Habits</h1>
      <HabitList habits={filteredHabits} />
    </div>
  );
}

export default FilteredHabitsPage;
