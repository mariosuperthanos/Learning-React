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

  // handling the undefined values
  const user = { ...session.user };

  if (user.name === undefined) {
    delete user.name;
  }

  if (user.image === undefined) {
    delete user.image
  }

  return {
    props: { session: { ...session, user } },
  };
}

export default ProfilePage;
