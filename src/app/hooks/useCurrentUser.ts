import { useEffect, useState } from 'react';
import { Profile } from '../../types';
import { getCurrentUser } from '../utils/user';

const defaultUser: Profile = {
  username: null,
  displayName: null,
  avatar: null,
};

export function useCurrentUser(): [Profile | null, string | null] {
  const [currentUser, setCurrentUser] = useState<Profile | null>(defaultUser);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setCurrentUser(currentUser);
        setProfileError(null);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setCurrentUser(defaultUser);
          setProfileError(error.message);
        }
      }
    }
    loadUser();
    overwolf.profile.onLoginStateChanged.addListener(loadUser);
    return () => overwolf.profile.onLoginStateChanged.removeListener(loadUser);
  }, []);

  return [currentUser, profileError];
}
