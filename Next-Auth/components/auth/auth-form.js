// import { signIn } from "../../pages/api/auth/[...nextauth]";
import { useState, useRef } from "react";
import classes from "./auth-form.module.css";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Cookies from 'js-cookie';
import { jwtVerify } from 'jose';
import { useRouter } from "next/router";

const createUser = async (email, password) => {
  try {
    const response = await axios.post("/api/auth/singup", {
      // am corectat și typo-ul din 'singup'
      email,
      password,
    });
    console.log("User created:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 422:
          console.error("Validation error:", error.response.data.message);
          throw new Error(error.response.data.message);
        case 400:
          console.error("Bad request:", error.response.data.message);
          throw new Error(error.response.data.message);
        default:
          console.error("Server error:", error.response.data.message);
          throw new Error("Something went wrong!");
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response from server");
    } else {
      console.error("Error setting up request:", error.message);
      throw new Error("Could not send request");
    }
  }
};

function AuthForm({ error }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const googleProviderHandler = async() => {
    const result = await signIn("google", {
      redirect: false,
    });

    if(result && result.ok===false) {
      console.log('auth failed')
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassowrd = passwordInputRef.current.value;

    // optional: Add validatio

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

    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassowrd);
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      {error && <p>you have error. Create an account</p>}
      <button onClick={googleProviderHandler}>Login with google</button>
    </section>
  );
}

export default AuthForm;
