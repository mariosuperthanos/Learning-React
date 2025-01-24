import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getServerSession(
      req,
      res,
      authOptions
    );
    console.log(session);
    if (!session) {
      return res.status(401).json({message: 'Not authenticated!'});
    }
    
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
