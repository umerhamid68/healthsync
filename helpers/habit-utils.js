// // export async function fetchAllHabits() {
// //     try {
// //       const response = await fetch("/api/habits");
  
// //       if (!response.ok) {
// //         throw new Error("Failed to fetch habits");
// //       }
  
// //       const data = await response.json();
// //       return data.habits; // Return the habits array
// //     } catch (error) {
// //       console.error("Error fetching habits from API:", error);
// //       return [];
// //     }
// //   }
  

// import { connectToDatabase } from "@/lib/mongodb"; 


// export async function fetchAllHabits() {
//   try {
//     const { db } = await connectToDatabase();
//     const habits = await db.collection("habits").find().toArray();
//     return habits.map((habit) => ({
//       id: habit._id.toString(),
//       name: habit.name,
//       frequency: habit.frequency,
//       streakCount: habit.streakCount || 0,
//       category: habit.category,
//       startDate: habit.startDate,
//     }));
//   } catch (error) {
//     console.error("Error fetching habits from database:", error);
//     return [];
//   }
// }




import { connectToDatabase } from "@/lib/mongodb"; 
import { ObjectId } from "mongodb";

// Function to fetch all habits (already provided)
export async function fetchAllHabits() {
  try {
    const { db } = await connectToDatabase();
    const habits = await db.collection("habits").find().toArray();
    return habits.map((habit) => ({
      id: habit._id.toString(),
      name: habit.name,
      frequency: habit.frequency,
      streakCount: habit.streakCount || 0,
      category: habit.category,
      startDate: habit.startDate,
    }));
  } catch (error) {
    console.error("Error fetching habits from database:", error);
    return [];
  }
}

// Function to fetch a single habit by ID or Name
export async function fetchHabitById(id) {
  try {
    const { db } = await connectToDatabase();

    // Check if ID is an ObjectId (MongoDB format)
    let habit;
    if (ObjectId.isValid(id)) {
      habit = await db.collection("habits").findOne({ _id: new ObjectId(id) });
    } else {
      habit = await db.collection("habits").findOne({ name: id });
    }

    if (!habit) {
      throw new Error("Habit not found");
    }

    return {
      id: habit._id.toString(),
      name: habit.name,
      frequency: habit.frequency,
      streakCount: habit.streakCount || 0,
      category: habit.category,
      startDate: habit.startDate,
    };
  } catch (error) {
    console.error("Error fetching habit by ID or name:", error);
    return null; // Return null if no habit found or error occurred
  }
}


export async function fetchCategories() {
  try {
    const { db } = await connectToDatabase();
    const categories = await db.collection("habits").distinct("category");
    console.log("Categories:", categories);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}


export async function fetchHabitsByCategory(category) {
  try {
    const { db } = await connectToDatabase();
    const habits = await db
      .collection("habits")
      .find({ category }) // Filter by category
      .toArray();

    return habits.map((habit) => ({
      id: habit._id.toString(),
      name: habit.name,
      frequency: habit.frequency,
      streakCount: habit.streakCount || 0,
      category: habit.category,
      startDate: habit.startDate,
    }));
  } catch (error) {
    console.error("Error fetching habits by category:", error);
    throw new Error("Failed to fetch habits for category");
  }
}