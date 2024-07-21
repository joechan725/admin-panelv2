import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useSessionStore } from '@/stores/useSessionStore';

export const useSessionListener = () => {
  const { loadUser, anonymouslySignIn } = useSessionStore((state) => ({
    loadUser: state.loadUser,
    anonymouslySignIn: state.anonymouslySignIn,
  }));

  useEffect(() => {
    // listen to the auth state
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      if (!userData) {
        await anonymouslySignIn();
        return;
      }
      await loadUser();
    });

    return () => unsubscribe();
  }, []);
};
