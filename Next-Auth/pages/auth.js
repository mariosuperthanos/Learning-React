import { useEffect } from 'react';
import AuthForm from '../components/auth/auth-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

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

  if (status === "authenticated") {
    return <p>Redirecting...</p>;
  }

  return (
    <AuthForm error={isError!==undefined}/>
  );
}

export default AuthPage;
