import type IconProps from "./icon.interface";

export const Close = ({ size = "24", className }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className="transform rotate-45"
        >
            <path
                d="M6 12h12M12 18V6"
                className={className || "stroke-slate-400/80"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
