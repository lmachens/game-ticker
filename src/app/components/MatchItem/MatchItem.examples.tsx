import { Example } from '../examples';
import MatchItem from './MatchItem';

export const MatchItemLeagueOfLegends: Example = () => (
  <MatchItem
    username="SabineOver9000"
    game="League of Legends"
    numberOfHighlights={12}
  />
);

export const MatchItemFortnite: Example = () => (
  <MatchItem username="AlexisOver9000" game="Fortnite" numberOfHighlights={3} />
);

export const MatchItemMultiple: Example = () => (
  <>
    <MatchItem
      username="SabineOver9000"
      game="League of Legends"
      numberOfHighlights={12}
    />
    <MatchItem
      username="AlexisOver9000"
      game="Fortnite"
      numberOfHighlights={3}
    />
  </>
);
