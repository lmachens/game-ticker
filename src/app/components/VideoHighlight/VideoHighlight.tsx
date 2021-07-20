type VideoHighlightProps = {
  src: string;
};

function VideoHighlight({ src }: VideoHighlightProps): JSX.Element {
  return (
    <video controls width={400}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default VideoHighlight;
