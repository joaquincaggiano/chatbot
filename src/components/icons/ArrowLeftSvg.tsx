interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowLeftSvg = ({
  width = 24,
  height = 24,
  color = "black",
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      width={width}
      height={height}
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M244 400L100 256l144-144M120 256h292"
      />
    </svg>
  );
};

export default ArrowLeftSvg;
