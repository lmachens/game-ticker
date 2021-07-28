import { useEffect, useState } from 'react';
import { PaginatedMatchesClient } from '../../types';
import { getMatches } from '../utils/api';

function useMatches(): PaginatedMatchesClient | null {
  const [matches, setMatches] = useState<PaginatedMatchesClient | null>(null);

  useEffect(() => {
    getMatches().then(setMatches);
  }, []);

  return matches;
}

export default useMatches;
