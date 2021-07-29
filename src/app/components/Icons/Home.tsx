import SVG, { SVGProps } from './SVG';

function IconHome({ className }: SVGProps): JSX.Element {
  return (
    <SVG className={className}>
      <>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </>
    </SVG>
  );
}

export default IconHome;
