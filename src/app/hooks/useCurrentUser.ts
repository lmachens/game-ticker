import { useEffect, useState } from 'react';
import { Profile } from '../../types';
import { getCurrentUser } from '../utils/user';

const defaultUser: Profile = {
  username: null,
  displayName: null,
  avatar: null,
};

export function useCurrentUser(): {
  currentUser: Profile | null;
  errorMessage: string | null;
} {
  const [currentUser, setCurrentUser] = useState<Profile | null>(defaultUser);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        setErrorMessage(null);
        const currentUser = await getCurrentUser();
        setCurrentUser(currentUser);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setCurrentUser(defaultUser);
          setErrorMessage(error.message);
        }
      }
    }
    loadUser();
    overwolf.profile.onLoginStateChanged.addListener(loadUser);
    return () => overwolf.profile.onLoginStateChanged.removeListener(loadUser);
  }, []);

  return { currentUser, errorMessage };
}
