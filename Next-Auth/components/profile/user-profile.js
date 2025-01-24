import { useSession } from 'next-auth/react';

import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useEffect } from 'react';

function UserProfile() {
  // Redirect away if NOT auth
  // const { data: session, status } = useSession();

  // useEffect(()=>{
  //   if (status === "unauthenticated") {
  //     window.location.href = '/auth'
  //   }
  // }, [status])

  // if(status==='loading'){
  //   return <p className={classes.profile}>Loading...</p>
  // }

  // if (status === "authenticated") {
    return (
      <section className={classes.profile}>
        <h1>Your User Profile</h1>
        <ProfileForm />
      </section>
    )
  // }
}

export default UserProfile;
