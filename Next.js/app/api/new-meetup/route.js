import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// /api/new-meetup
// POST /api/new-meetup


export async function POST(req) {
  const data = await req.json();
  
  // const { title, image, address, description } = data;

  const client = await MongoClient.connect('mongodb+srv://david1bargianu:IZSNk4qSavwqaCKE@cluster0.a6hho.mongodb.net/meetups?retryWrites=true&w=majority');
  
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const result = await meetupsCollection.insertOne({data});

  client.close();

  return NextResponse.json(
    { message: 'ok'},
    { status: 200 }
  );
}

// export default POST;