import classes from './MatchItem.module.css';

type MatchItemProps = {
  username: string;
  game: string;
  numberOfHighlights: number;
};
function MatchItem({
  username,
  game,
  numberOfHighlights,
}: MatchItemProps): JSX.Element {
  return (
    <article className={classes.container}>
      <p>{username}</p>
      <p>{game}</p>
      <p>{numberOfHighlights}</p>
    </article>
  );
}

export default MatchItem;
