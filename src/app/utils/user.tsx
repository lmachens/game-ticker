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
