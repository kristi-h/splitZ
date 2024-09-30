export default function Button({
  children,
  variant,
  onClick,
  className,
  type,
}) {
  const baseStyles = "bg-accent whitespace-nowrap text-white ";
  const buttonStyles =
    variant === "small"
      ? "py-2 px-3 rounded-md hover:bg-secondary text-sm font-light"
      : "py-3 max-w-[380px] px-8 rounded-xl hover:bg-secondary";

  return (
    <button
      className={`${baseStyles} ${buttonStyles} ${className} transition-colors`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
