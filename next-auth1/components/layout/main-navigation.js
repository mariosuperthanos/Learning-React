import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import classes from "./main-navigation.module.css";
import { Fragment } from "react";

function MainNavigation() {
  const { data: session, status } = useSession();

  async function logoutHanler() {
    await signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <Fragment>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logoutHanler}>Logout</button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
