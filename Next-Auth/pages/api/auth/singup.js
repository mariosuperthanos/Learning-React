import { hashPassword } from "../../../lib/auth";
import { connectToDB } from "../../../lib/db";

const handler = async (req, res) => {
  if(req.method!=='POST'){
    return;
  }

  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid input" });
    return;
  }

  const client = await connectToDB();

  const db = client.db();

  const existingUser = await db.collection('users').findOne({email: email})

  if(existingUser) {
    client.close();
    return res.status(422).json({message: 'User exists already!'});
  }

  const hashedPassword = await hashPassword(password);
  console.log(hashedPassword);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword
  });

  return res.status(201).json({message: 'Created user!'});
};

export default handler;