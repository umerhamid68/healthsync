// import { connectToDatabase } from "../../lib/mongodb";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { name, frequency, startDate } = req.body;

//     if (!name || !frequency || !startDate) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     try {
//       const { db } = await connectToDatabase();

//       const newHabit = {
//         name,
//         frequency,
//         startDate,
//         streakCount: 0, // Initialize streak count to 0
//         createdAt: new Date(),
//       };

//       const result = await db.collection("habits").insertOne(newHabit);

//       res.status(201).json({ message: "Habit added successfully", habit: newHabit });
//     } catch (error) {
//       console.error("Error adding habit:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }


// import { connectToDatabase } from "../../lib/mongodb";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { name, frequency, startDate, category } = req.body;

//     if (!name || !frequency || !startDate || !category) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     try {
//       const { db } = await connectToDatabase();

//       // Check for duplicate habit names
//       const existingHabit = await db.collection("habits").findOne({ name });
//       if (existingHabit) {
//         return res.status(400).json({ message: "A habit with this name already exists." });
//       }

//       const newHabit = {
//         name,
//         frequency,
//         startDate,
//         category, // Add category field
//         streakCount: 0,
//         createdAt: new Date(),
//       };

//       const result = await db.collection("habits").insertOne(newHabit);

//       res.status(201).json({ message: "Habit added successfully", habit: newHabit });
//     } catch (error) {
//       console.error("Error adding habit:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }

















import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, frequency, startDate, category } = req.body;

    if (!name || !frequency || !startDate || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      const { db } = await connectToDatabase();

      // Check for duplicate habit names
      const existingHabit = await db.collection("habits").findOne({ name });
      if (existingHabit) {
        return res.status(400).json({ message: "A habit with this name already exists." });
      }

      const newHabit = {
        name,
        frequency,
        startDate,
        category, // Add category field
        streakCount: 0,
        createdAt: new Date(),
      };

      const result = await db.collection("habits").insertOne(newHabit);

      res.status(201).json({ message: "Habit added successfully", habit: newHabit });
    } catch (error) {
      console.error("Error adding habit:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    try {
      const { db } = await connectToDatabase();

      // Fetch all habits
      const habits = await db.collection("habits").find().toArray();

      // Transform MongoDB objects to JSON-friendly format
      const transformedHabits = habits.map((habit) => ({
        id: habit._id.toString(),
        name: habit.name,
        frequency: habit.frequency,
        streakCount: habit.streakCount || 0,
        category: habit.category,
        startDate: habit.startDate,
      }));

      console.log("Fetched habits:", transformedHabits);

      res.status(200).json({ habits: transformedHabits });
    } catch (error) {
      console.error("Error fetching habits:", error);
      res.status(500).json({ message: "Failed to fetch habits" });
    }
  } 
}
