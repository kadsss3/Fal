
import React from 'react';

export const CoffeeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5h3m-6.75 0h10.5c.621 0 1.125-.504 1.125-1.125v-6.75c0-.621-.504-1.125-1.125-1.125H6.375c-.621 0-1.125.504-1.125 1.125v6.75c0 .621.504 1.125 1.125 1.125z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h3M12 3v3m2.85-2.25c.39.39.39 1.023 0 1.414C14.46 5.54 14 6 14 6h-4c0 0-.46-.46-.85-.852a.999.999 0 010-1.414c.39-.39 1.023-.39 1.414 0L12 4.5l1.44-1.44z"
    />
  </svg>
);
