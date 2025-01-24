// '[...nextauth].js' means catch all api route
// on server
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { verifyPassword } from "../../../lib/auth";
import { connectToDB } from "../../../lib/db";
import { promisify } from "util";
import { sign, verify } from "jsonwebtoken";

export const runtime = "nodejs";

// Configurarea handler-ului NextAuth
// const handler = NextAuth({
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 zile
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//     encryption: true,
//     algorithms: ['HS256'], // Specifică algoritmul RS256 pentru semnătura JWT
//   },
//   cookies: {
//     sessionToken: {
//       name: 'davidConqueror',
//       options: {
//         httpOnly: false, // Permite accesul din JavaScript (folosește-l cu prudență)
//         sameSite: 'Lax', // Permite cookie-ul pe aceleași site-uri, poate fi 'Strict' pentru mai multă securitate
//         path: '/', // Cookie-ul va fi disponibil pe tot site-ul
//         maxAge: 30 * 24 * 60 * 60, // Setează durata maximă a cookie-ului la 30 de zile
//       },
//     },
//   },

//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const client = await connectToDB();

//         const usersCollection = client.db().collection('users');

//         const user = await usersCollection.findOne({email: credentials.email})

//         if(!user) {
//           throw new Error('No user found!');
//         }

//         const isValid = await verifyPassword(credentials.password, user.password);

//         if(!isValid) {
//           throw new Error('Could not log you in!');
//         }

//         return {
//           email: user.email,
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       // console.log(1111);
//       // Adaugă datele utilizatorului în token, dacă există un utilizator
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }
//       // console.log(token);
//       return token; // Returnează token-ul actualizat
//     },
//     async session({ session, token }) {
//       console.log("Session Token: ", token);

//       // console.log(token);
//       session.token = token;  // Asigură-te că JWT-ul ajunge în sesiune
//       // console.log(session);
//       return session;
//     },
//   },
// });

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 zile
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
    algorithms: ["HS256"], // Specifică algoritmul RS256 pentru semnătura JWT
  },
  cookies: {
    sessionToken: {
      name: "next-authCookie",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "Strict",
        path: "/",
        maxAge: 24 * 60 * 60,
      },
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await connectToDB();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        return {
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  pages: {
    error: '/auth',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        // Login cu Google
        const client = await connectToDB();

        const usersCollection = client.db().collection('users');

        const existingUser = await usersCollection.findOne({ email: user.email });

        if (!existingUser) {
          // Poți crea un nou utilizator sau returna false dacă nu dorești asta
          return false;
        }
      }
      return true; // Permite login-ul
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export const { auth } = NextAuth(authOptions);

// Exportă handler-ul pentru rutele GET și POST
export default handler;
