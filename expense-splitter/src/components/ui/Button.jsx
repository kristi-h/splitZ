export default function Button({
  children,
  variant,
  onClick,
  className,
  type,
}) {
  const buttonStyles =
    variant === "small"
      ? "bg-accent text-white py-2 px-6 rounded-[0.25rem] hover:bg-secondary text-sm font-light"
      : "bg-accent text-white py-2 px-5 rounded-md hover:bg-secondary";

  return (
    <button
      className={`${buttonStyles} ${className} transition-colors`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
