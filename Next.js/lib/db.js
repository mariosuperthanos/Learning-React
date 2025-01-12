// lib/db.js
import { MongoClient } from "mongodb";

const client = global.mongoClient || new MongoClient('mongodb+srv://david1bargianu:IZSNk4qSavwqaCKE@cluster0.a6hho.mongodb.net/meetups?retryWrites=true&w=majority');

global.mongoClient = client;

async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect(); // Conectează-te doar dacă nu ești deja conectat
  }
  const db = client.db(); // Obține instanța bazei de date
  return db;
}

export { connectToDatabase };
