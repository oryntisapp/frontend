interface PinterestIconProps {
  className?: string;
}

export default function PinterestIcon({ className = "h-4 w-4" }: PinterestIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 21.2C8 18 9.5 14 12 10c2.5 4 4 8 4 11.2" />
      <path d="M9.5 14.5c0-2 1-4.5 2.5-6.5" />
    </svg>
  );
}
