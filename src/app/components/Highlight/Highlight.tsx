import { MatchHighlightClient } from '../../../types';
import { classNames } from '../../utils/styles';
import VideoHighlight from '../VideoHighlight/VideoHighlight';
import classes from './Highlight.module.css';
import commentSrc from './comment.png';
import shareSrc from './share.png';
import likeSrc from './like.png';
import { toTimeAgo } from '../../utils/dates';
import UserInfo from '../UserInfo/UserInfo';
import defaultAvatarSrc from '../User/defaultAvatar.png';

type HighlightProps = {
  matchIsActive: boolean;
  layout: 'full' | 'half';
  onHighlightClick: (matchId: string) => void;
  highlight: Omit<MatchHighlightClient, '_id'>;
};

function Highlight({
  matchIsActive,
  layout,
  onHighlightClick,
  highlight,
}: HighlightProps): JSX.Element {
  const { matchId, timestamp, videoSrc, username, avatar } = highlight;

  return (
    <article className={classNames(classes.container, classes[layout])}>
      <header className={classes.header}>
        <UserInfo
          username={username}
          status="Fortnite"
          avatarSrc={avatar || defaultAvatarSrc}
        />
        <section className={classes.info}>
          {layout === 'full' && (
            <p>
              {matchIsActive && (
                <div className={classes.info__active}>
                  <svg width={12} height={12}>
                    <circle fill="green" r="6" cx="6" cy="6" />
                  </svg>
                  Match is active
                </div>
              )}
            </p>
          )}

          <p>{toTimeAgo(new Date(timestamp))}</p>
        </section>
      </header>
      <main>
        <VideoHighlight src={videoSrc} />
      </main>
      <aside className={classes.more}>
        <button className={classes.social}>
          <img src={commentSrc} alt="Comments" />
          20
        </button>
        <button className={classes.social}>
          <img src={shareSrc} alt="Share" />5
        </button>
        <button className={classes.social}>
          <img src={likeSrc} alt="Likes" />
          360
        </button>
        {layout === 'full' && (
          <a
            className={classes.more__match}
            href="#"
            onClick={() => onHighlightClick(matchId)}
          >
            Go to match
          </a>
        )}
      </aside>
    </article>
  );
}

export default Highlight;
