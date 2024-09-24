export default function Card({ id, icon, title, subtitle, price }) {
  const handleClick = () => {
    console.log("Clicking ID: ", id);
  };
  return (
    <div
      onClick={handleClick}
      className="bg-card-bg mb-2 flex cursor-pointer items-center rounded-2xl p-4"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 rounded-xl bg-primary p-3">
            <i className={`fa-solid ${icon} text-3xl text-white`}></i>
          </div>
          <div>
            <h2 className="leading-5">{title}</h2>
            <p>{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mx-4 text-lg">{price}</div>
          <div>
            <i className="fa-solid fa-chevron-right mr-2 text-3xl text-accent"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
