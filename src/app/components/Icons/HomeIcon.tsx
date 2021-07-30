import SVG, { SVGProps } from '../IconSvg/IconSvg';

function HomeIcon(props: Omit<SVGProps, 'children'>): JSX.Element {
  return (
    <SVG {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SVG>
  );
}

export default HomeIcon;
