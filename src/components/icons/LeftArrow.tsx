import IconProps from "./icon.interface";

export const LeftArrow = ({ size = "24", className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        className={className || "stroke-slate-400 dark:stroke-slate-600"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth="2"
        d="M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08"
      />
    </svg>
  );
};
