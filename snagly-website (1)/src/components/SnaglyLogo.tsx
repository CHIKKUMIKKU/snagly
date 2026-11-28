interface SnaglyLogoProps {
  className?: string;
}

export function SnaglyLogo({ className = 'h-8 w-8' }: SnaglyLogoProps) {
  return (
    <img
      src="/snagly-logo.png"
      alt="Snagly"
      className={`${className} object-contain`}
      draggable={false}
    />
  );
}
