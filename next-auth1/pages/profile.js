import { getServerSession } from 'next-auth';
import UserProfile from '../components/profile/user-profile';
import { authOptions } from './api/auth/[...nextauth]';

function ProfilePage() {
  return <UserProfile />;
}

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

  // Setează valori implicite pentru `name` și `image` dacă sunt undefined
  if (user.name === undefined) {
    user.name = 'Default Name';  // Setează un fallback pentru name
  }

  if (user.image === undefined) {
    user.image = 'default-image-url.png';  // Setează un fallback pentru image
  }

  return {
    props: { session: { ...session, user } },
  };
}

export default ProfilePage;
