import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();

  return (
    <div className="bg-accent text-white mt-auto cursor-pointer"
         onClick={() => {navigate('/about')}}>
    <h2 className="text-center font-bold">Application Creators</h2>
    </div>
  )
}

export default Footer;