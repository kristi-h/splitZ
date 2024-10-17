export default function Button({
  children,
  variant,
  onClick,
  className,
  type,
  disabled,
}) {
  const baseStyles =
    "bg-gradientDark saturate-150 brightness-100 whitespace-nowrap text-accent";
  const buttonStyles =
    variant === "small"
      ? "py-2 px-3 rounded-md hover:bg-secondary text-sm font-light"
      : "py-3 max-w-[380px] px-4 rounded-xl hover:bg-secondary";

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${buttonStyles} ${className} transition-colors`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
