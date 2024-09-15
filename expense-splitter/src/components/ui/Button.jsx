export default function Button({ children, variant, onClick, className }) {
  const buttonStyles =
    variant === 'small'
      ? 'bg-accent text-white py-1 px-[0.7rem] rounded-[0.25rem] hover:bg-secondary text-sm font-light'
      : 'bg-accent text-white py-1 px-5 rounded-md hover:bg-secondary'

  return (
    <button
      className={`${buttonStyles} ${className} transition-colors`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
