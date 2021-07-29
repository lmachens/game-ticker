type IconProps = {
  className: string;
};

function IconHome({ className }: IconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <defs>
        <linearGradient
          id="occtyGradient"
          x1="0.94"
          y1="0.74"
          x2="0.06"
          y2="0.26"
        >
          <stop offset="0%" stop-color="#f68e31" />
          <stop offset="10.67%" stop-color="#fb8d28" />
          <stop offset="32%" stop-color="#ff8f38" />
          <stop offset="42.67%" stop-color="#ff824f" />
          <stop offset="64%" stop-color="#fe656f" />
          <stop offset="76%" stop-color="#fa3a7b" />
          <stop offset="100%" stop-color="#bf2a88" />
        </linearGradient>
      </defs>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

export default IconHome;
