import { useEffect, useState } from 'react';

export type Profile = {
  username: string | null;
  displayName: string | null;
  avatar: string | null;
};

export function getCurrentUser(): Promise<Profile | null> {
  return new Promise((resolve, reject) => {
    try {
      overwolf.profile.getCurrentUser((result) => {
        const { success, displayName, username, avatar } = result;
        if (!success) {
          resolve(null);
          return;
        }

        if (displayName && username && avatar) {
          resolve({
            displayName,
            username,
            avatar,
          });
          return;
        }

        reject();
      });
    } catch (error) {
      reject(error);
    }
  });
}

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
