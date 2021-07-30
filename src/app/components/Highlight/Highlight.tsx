import { MatchHighlight } from '../../../types';
import { classNames } from '../../utils/styles';
import VideoHighlight from '../VideoHighlight/VideoHighlight';
import classes from './Highlight.module.css';
import commentSrc from './comment.png';
import shareSrc from './share.png';
import likeSrc from './like.png';
import { toTimeAgo } from '../../utils/dates';

type HighlightProps = {
  matchIsActive: boolean;
  layout: 'full' | 'half';
} & MatchHighlight;

function Highlight({
  matchIsActive,
  layout,
  timestamp,
  videoSrc,
}: HighlightProps): JSX.Element {
  return (
    <article className={classNames(classes.container, classes[layout])}>
      <header className={classes.header}>
        <section>PROFILE</section>
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
          <a className={classes.more__match} href="#">
            Go to match
          </a>
        )}
      </aside>
    </article>
  );
}

export default Highlight;
