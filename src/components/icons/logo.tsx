import type { SVGProps } from 'react';

export function CarLockLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="currentColor"
        d="M208 80h-6.1a72 72 0 0 0-143.8 0H48a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-96a16 16 0 0 0-16-16Zm-80 88a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm36-88a36 36 0 0 1-72 0Z"
      />
    </svg>
  );
}
