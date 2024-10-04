export default function CardExpenseDetail({
  id,
  type,
  icon,
  title,
  subtitle,
  price,
}) {
  return (
    <div className="mb-2 flex items-center rounded-2xl bg-card-bg p-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 rounded-xl bg-primary p-3">
            <i className={`fa-solid ${icon} text-3xl text-white`}></i>
          </div>
          <div>
            <h2 className="leading-5">{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center">
          <div className="mx-4 text-lg">{price && `$${price}`}</div>
        </div>
      </div>
    </div>
  );
}
