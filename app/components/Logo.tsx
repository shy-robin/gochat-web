import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      aria-label="GoChat Logo"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" /> 
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path
        fill="url(#logoGradient)"
        d="M50,0C22.4,0,0,22.4,0,50s22.4,50,50,50c13.2,0,25.3-5.1,34.2-13.4c-1.2-2.1-2.6-4-4.2-5.8 C73.3,86.5,62.1,91.3,50,91.3C27.2,91.3,8.7,72.8,8.7,50S27.2,8.7,50,8.7c15.4,0,29,8.4,36.3,21.1 C88.2,26.2,90.5,22.4,93,18.2C82.2,6.9,66.8,0,50,0z M79.1,42.5c-2.3-6.1-6.8-11.1-12.5-13.9c-2.2-1.1-4.6-1.6-7-1.6 c-8.4,0-15.8,5.5-18.2,13.3c-0.8,2.6-1.2,5.3-1.2,8.1c0,11.5,9.4,20.9,20.9,20.9c6.1,0,11.5-2.6,15.3-6.8 C79.7,58.1,81.4,50.7,79.1,42.5z"
      />
    </svg>
  );
};

export default Logo;
