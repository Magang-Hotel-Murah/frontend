import React from "react";

const Logo = ({ size = 150 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Warna gradasi oranye */}
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff7b47" />
          <stop offset="100%" stopColor="#ffb76b" />
        </linearGradient>
      </defs>

      {/* Lingkaran orang dan lengannya */}
      <g fill="url(#grad)" stroke="none">
        {/* Orang atas */}
        <circle cx="100" cy="30" r="12" />
        <path d="M85 45 Q100 65 115 45" />

        {/* Orang kanan */}
        <circle cx="170" cy="100" r="12" />
        <path d="M155 85 Q135 100 155 115" />

        {/* Orang bawah */}
        <circle cx="100" cy="170" r="12" />
        <path d="M85 155 Q100 135 115 155" />

        {/* Orang kiri */}
        <circle cx="30" cy="100" r="12" />
        <path d="M45 85 Q65 100 45 115" />
      </g>

      {/* Huruf M di tengah */}
      <text
        x="100"
        y="110"
        textAnchor="middle"
        fontSize="40"
        fontFamily="Poppins, sans-serif"
        fill="url(#grad)"
        fontWeight="bold"
      >
        M
      </text>
    </svg>
  );
};

export default Logo;
