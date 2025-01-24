### Using Next auth
In `_app.js` file
```js
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
```

### Next auth config options:
I made an `/pages/api/auth/[...nextauth.js]` file with auth config:
```js
export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
    algorithms: ["HS256"],
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
    error: '/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const client = await connectToDB();

        const usersCollection = client.db().collection('users');

        const existingUser = await usersCollection.findOne({ email: user.email });

        if (!existingUser) {
          return false;
        }
      }
      return true;
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
  }
};
```

### Sign in with credentials:
```js
if (isLogin) {
  const result = await signIn("credentials", {
    redirect: false,
    email: enteredEmail,
    password: enteredPassowrd
  });

  if (!result?.error) {
    // set some auth state
    router.replace('/profile');
  }

}
```

### Sign out
```js
async function logoutHanler() {
  await signOut();
}
```

### Sign in with google:
```js
const result = await signIn("google", {
  redirect: false,
});
```

For error handling, I set `error` page from `pages` property as the default auth page:
```js
pages: {
  error: '/error',
},
```
Then I handled the error inside the page component, because next auth will add an error query in URL of error page: `http://localhost:3000/auth?error=AccessDenied`. 

Full implementation:
```js
function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isError = router.query.error;
  console.log(isError);

  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [session, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Dacă utilizatorul este autentificat, nu arătăm formularul
  // pentru că oricum îl redirecționăm
  if (status === "authenticated") {
    return <p>Redirecting...</p>;
  }

  return (
    <AuthForm error={isError!==undefined}/>
  );
}
```

### Accesing the session inside of components(client side):
```js
const { data: session, status } = useSession();
```
Status represents the current state of session: `loading`, `authentificated` and `unauthentificated`. `session` object represnts the dat stored inside of session such as token data or user details(email, role)

### Accesing the session in server side code:
```js
const session = await getServerSession(context.req, context.res, authOptions);
```

### Protecting routes
1. Protecting in client side
```js
  function AuthPage() {
  const { data: session, status } = useSession();
  // error handling for error case
  const router = useRouter();
  const isError = router.query.error;
  console.log(isError);

  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [session, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return <p>Redirecting...</p>;
  }

  return (
    <AuthForm error={isError!==undefined}/>
  );
}
```

2. Protecting in server side:
```js
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const user = { ...session.user };

  if (user.name === undefined) {
    user.name = 'Default Name';
  }

  if (user.image === undefined) {
    user.image = 'default-image-url.png';
  }

  return {
    props: { session: { ...session, user } },
  };
}
```

3. Protecting API routes when doing API requests:
```js 
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
```

