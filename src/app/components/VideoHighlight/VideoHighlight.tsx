import classes from './VideoHighlight.module.css';

type VideoHighlightProps = {
  src: string;
};

function VideoHighlight({ src }: VideoHighlightProps): JSX.Element {
  return (
    <video controls className={classes.video}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default VideoHighlight;
