import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div
      className="mt-auto cursor-pointer bg-primary text-white"
      onClick={() => {
        navigate("/about");
      }}
    >
      <h2 className="text-center font-bold">About Our Team</h2>
    </div>
  );
};

export default Footer;
