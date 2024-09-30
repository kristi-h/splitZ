import { useNavigate } from "react-router-dom";

export default function Card({
  id,
  type,
  icon,
  title,
  subtitle,
  price,
  hasButtons,
  children,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${type}/id/${id}`);
  };
  console.log(hasButtons);

  return (
    <div
      onClick={hasButtons ? null : handleClick}
      className={`mb-2 flex ${hasButtons ? "" : "cursor-pointer"} items-center rounded-2xl bg-card-bg p-4`}
    >
      <div className="relative flex w-full items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 flex w-[60px] rounded-xl bg-primary p-3">
            <i className={`fa-solid ${icon} mx-auto text-3xl text-white`}></i>
          </div>
          <div>
            <h2 className="leading-5">{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
        <div
          // if the card has buttons, make absolute so they don't fly off the right side
          className={`${hasButtons ? "absolute right-0" : ""} flex items-center`}
        >
          <div className="mx-4 text-lg">{price && `$${price}`}</div>
          {hasButtons ? (
            <div className="flex items-center gap-2">{children}</div>
          ) : (
            <div>
              <i className="fa-solid fa-chevron-right mr-2 text-3xl text-accent"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
