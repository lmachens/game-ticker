import SVG, { SVGProps } from './SVG';

function IconFavorites({ className }: SVGProps): JSX.Element {
  return (
    <SVG className={className}>
      <>
        <g>
          <path d="M0,0h24v24H0V0z" fill="none" />
          <path d="M0,0h24v24H0V0z" fill="none" />
        </g>
        <g>
          <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
        </g>
      </>
    </SVG>
  );
}

export default IconFavorites;
