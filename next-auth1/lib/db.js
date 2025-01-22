import { MongoClient } from "mongodb";

export const connectToDB = async()=> {
  const client = await MongoClient.connect('mongodb+srv://david1bargianu:IZSNk4qSavwqaCKE@cluster0.a6hho.mongodb.net/auth-demo?retryWrites=true&w=majority');

  return client;
}