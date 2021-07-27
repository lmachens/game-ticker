import { useEffect, useState } from 'react';
import { getCurrentUser, Profile } from '../utils/user';

export function useCurrentUser(): [Profile | null, string | null] {
  const [currentUser, setProfile] = useState<Profile | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setProfile(currentUser);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
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
