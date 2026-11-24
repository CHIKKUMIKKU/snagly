interface SnaglyLogoProps {
  className?: string;
}

export function SnaglyLogo({ className = 'h-8 w-8' }: SnaglyLogoProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="9" fill="#0F172A" />
      <path
        d="M11 10.5C11 9.67157 11.6716 9 12.5 9H18.5C22.6421 9 26 12.3579 26 16.5C26 20.6421 22.6421 24 18.5 24H15V26.5C15 27.0523 14.5523 27.5 14 27.5H12.5C11.6716 27.5 11 26.8284 11 26V10.5Z"
        fill="#2563EB"
      />
      <path
        d="M16 13.4C16 12.7905 16.6788 12.4267 17.1859 12.7647L22.5859 16.3647C23.0389 16.6667 23.0389 17.3333 22.5859 17.6353L17.1859 21.2353C16.6788 21.5733 16 21.2095 16 20.6V13.4Z"
        fill="#F97316"
      />
    </svg>
  );
}
