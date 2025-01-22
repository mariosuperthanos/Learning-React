import { useEffect } from 'react';
import AuthForm from '../components/auth/auth-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  return <AuthForm />;
}

export default AuthPage;
