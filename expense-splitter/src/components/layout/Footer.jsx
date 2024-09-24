import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <div className="bg-sky-100 mt-auto opacity-20">
      <h2 className="bg-blue-300 text-center">Our Team</h2>
        <div className="flex text-center justify-center">
            <div className="mt-2 mb-2">
                <p className="mt-1 font-bold">Kristi
                    <a className="ml-1" href="https://github.com/kristi-h"><GitHubIcon /></a> /
                    {/* <a href=""><LinkedInIcon /></a> */}
                </p>
                <p className="mb-1 text-sm">Role</p>
                <p className="font-bold">Carlos Cespedes
                    <a className="ml-1" href="https://github.com/ccespedes"><GitHubIcon /></a> /
                    {/* <a href=""><LinkedInIcon /></a> */}
                </p>
                <p className="mb-1 text-sm">Developer</p>
            </div>
            <div className="ml-10 mt-2 mb-2">
                <p className="font-bold">Abel Sila
                    <a className="ml-1" href="https://github.com/belunatic"><GitHubIcon /></a> /
                    <a href="https://www.linkedin.com/in/abel-sila-24b4a97a/"><LinkedInIcon /></a>
                </p>
                <p className="mb-1 text-sm">Developer</p>
                <p className="font-bold">Matthew Neie
                    <a className="ml-1" href="https://github.com/MatthewNeie"><GitHubIcon /></a> /
                    <a href="https://www.linkedin.com/in/matthew-neie"><LinkedInIcon /></a>
                </p>
                <p className="mb-1 text-sm">Developer</p>
                <p className="font-bold">Alex Singh
                    <a className="ml-1" href="https://github.com/singhalex"><GitHubIcon /></a> /
                    <a href="https://www.linkedin.com/in/kaur-singh-748000254/"><LinkedInIcon /></a>
                </p>
                <p className="mb-1 text-sm">Developer</p>
            </div>
            <div className="ml-10 mt-2 mb-2">
                <p className="font-bold">Bolaji
                    <a className="ml-1" href="https://github.com/Anuoluwatobi"><GitHubIcon /></a> /
                    <a href="https://www.linkedin.com/in/anuoluwatobi-majesty-bolaji-734583237/"><LinkedInIcon /></a>
                </p>
                <p className="mb-1 text-sm">Product Owner</p>
                <p className="font-bold">Smiti Mishra
                    <a className="ml-1" href="https://github.com/SM171906"><GitHubIcon /></a> /
                    <a href="https://www.linkedin.com/in/smitimishra/"><LinkedInIcon /></a>
                </p>
                <p className="mb-1 text-sm">Scrum Master</p>
                <p className="font-bold">Abby Nyhof
                    <a className="ml-1" href="https://github.com/abbynyhof"><GitHubIcon /></a> /
                    <a href="https://www.linkedin.com/in/abbynyhof/"><LinkedInIcon /></a>
                </p>
                <p className="mb-1 text-sm">UX Designer</p>
            </div>
        </div>
        <p className="text-center">see GitHub repository <a href="https://github.com/chingu-voyages/v51-tier2-team-28">here</a></p>
        <p className="text-center italic">Chingu Voyages</p>
    </div>
  )
}

export default Footer;
