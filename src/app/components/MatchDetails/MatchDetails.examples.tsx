import useFetch from '../../hooks/useFetch';
import { getMatches } from '../../utils/api';
import { Example } from '../examples';
import MatchDetails from './MatchDetails';

export const MatchDetailsLatest: Example = () => {
  const { data: matches } = useFetch(() =>
    getMatches({ page: 1, itemsPerPage: 10 })
  );

  const match = matches?.results[0];
  return <>{match ? <MatchDetails matchId={match._id} /> : 'No match found'}</>;
};
