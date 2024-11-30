// import { connectToDatabase } from "@/lib/mongodb";

// export default async function handler(req, res) {
//   const {id} = req.query;
//   const { db } = await connectToDatabase();

//   if(req.method==="POST") {
//       try {
//         const habit = await db.collection("habits").findOne({ _id: new ObjectId(id) });
//         if (!habit) {
//           return res.status(404).json({ success: false, message: "Habit not found" });
//         }

//         res.status(200).json({ success: true, habit });
//       } catch (error) {
//         res.status(500).json({ success: false, message: "Failed to fetch habit" });
//       }
//   }

//   else if(req.method==="PUT")  
//   {
//       try {
//         const result = await db
//           .collection("habits")
//           .findOneAndUpdate(
//             { _id: new ObjectId(id) },
//             { $inc: { streakCount: 1 } }, // Increment streak count
//             { returnOriginal: false } // Return updated document
//           );

//         if (!result.value) {
//           return res.status(404).json({ success: false, message: "Habit not found" });
//         }

//         res.status(200).json({ success: true, habit: result.value });
//       } catch (error) {
//         res.status(500).json({ success: false, message: "Failed to update habit" });
//       }
//   }
// }





import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  try {
    const { db } = await connectToDatabase();

    if (method === "GET") {
      // Fetch habit by ID
      let habit;
      if (ObjectId.isValid(id)) {
        habit = await db.collection("habits").findOne({ _id: ObjectId.createFromHexString(id) });
      } else {
        habit = await db.collection("habits").findOne({ name: id });
      }

      if (!habit) {
        return res.status(404).json({ success: false, message: "Habit not found" });
      }

      return res.status(200).json({
        success: true,
        habit: {
          id: habit._id.toString(),
          name: habit.name,
          frequency: habit.frequency,
          streakCount: habit.streakCount || 0,
          category: habit.category,
          startDate: habit.startDate,
        },
      });
    }

    if (method === "PUT") {
      // Increment streak count
      console.log(ObjectId.createFromHexString(id))
      const result = await db
        .collection("habits")
        .findOneAndUpdate(
          { _id: ObjectId.createFromHexString(id) },
          { $inc: { streakCount: 1 } },
          {returnDocument: 'after'}
        );
     console.log(result)

      if (!result) {
        return res.status(404).json({ success: false, message: "Habit not found" });
      }

      return res.status(200).json({
        success: true,
        habit: {
          id: result._id.toString(),
          name: result.name,
          frequency: result.frequency,
          streakCount: result.streakCount || 0,
          category: result.category,
          startDate: result.startDate,
        },
      });
    }

    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

