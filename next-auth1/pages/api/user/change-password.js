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

    // const user = { ...session.user };

    // // Setează valori implicite pentru `name` și `image` dacă sunt undefined
    // if (user.name === undefined) {
    //   user.name = "Default Name"; // Setează un fallback pentru name
    // }

    // if (user.image === undefined) {
    //   user.image = "default-image-url.png"; // Setează un fallback pentru image
    // }
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
