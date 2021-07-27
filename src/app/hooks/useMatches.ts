import { useEffect, useState } from 'react';
import { PaginatedMatches } from '../../types';
import { getMatches } from '../utils/api';

function useMatches(): PaginatedMatches | null {
  const [matches, setMatches] = useState<PaginatedMatches | null>(null);

  useEffect(() => {
    getMatches().then(setMatches);
  }, []);

  return matches;
}

export default useMatches;
