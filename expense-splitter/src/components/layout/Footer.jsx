import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/about");
      }}
      className="over fixed bottom-0 left-1/2 z-40 flex w-full -translate-x-1/2 cursor-pointer bg-primary py-1 text-white"
    >
      <div className="mx-auto flex gap-2">
        {" "}
        <h2 className="text-center text-sm font-medium">About Our Team</h2>
      </div>
    </div>
  );
};

export default Footer;
