import { UseDataContext } from "../context/SiteContext";

export default function ReceiptImage({ image_url, image_alt }) {
  const { handleSetModal } = UseDataContext();
  return (
    <div className="bg-black-100 flex flex-col items-center justify-center bg-gray-100 pb-6 pt-2 text-2xl text-accent">
      <div
        onClick={handleSetModal}
        className="m-2 self-end pr-2 hover:cursor-pointer"
      >
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="">
        <img src={image_url} alt={image_alt} max={`100%`} />
        <div className="mt-3 text-center text-xl">
          <a href={image_url} target="_blank">
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
