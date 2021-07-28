import { useEffect, useState } from 'react';
import { PaginatedMatchesClient, Profile } from '../../types';
import { getMatches, getUserMatches } from '../utils/api';

function useMatches(
  username?: Profile['username']
): PaginatedMatchesClient | null {
  const [matches, setMatches] = useState<PaginatedMatchesClient | null>(null);

  useEffect(() => {
    if (username) {
      getUserMatches(username).then(setMatches);
    } else {
      getMatches().then(setMatches);
    }
  }, [username]);

  return matches;
}

export default useMatches;
