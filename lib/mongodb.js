import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect("mongodb+srv://umerhamid168:umer34556@healthsync.hijrf.mongodb.net/?retryWrites=true&w=majority&appName=healthsync")
  const db = client.db();

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
