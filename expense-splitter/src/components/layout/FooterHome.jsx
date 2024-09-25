import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FooterHome = () => {
  return (
    <div className="bg-sky-100 mt-auto opacity-25">
      <h2 className="bg-blue-300 text-center">Developer Team</h2>
        <div className="flex text-center justify-center">
            <div className="mt-2 mb-2">
                <p className="mt-1 text-sm font-bold">Kristi
                    <a className="ml-1" href="https://github.com/kristi-h"><GitHubIcon /></a> /
                    {/* <a href=""><LinkedInIcon /></a> */}
                </p>
                <p className="mt-1 font-bold text-sm">Carlos Cespedes
                    <a className="ml-1" href="https://github.com/ccespedes"><GitHubIcon /></a> /
                    {/* <a href=""><LinkedInIcon /></a> */}
                </p>
                <p className="mt-1 font-bold text-sm">Abel Sila
                    <a className="ml-1" href="https://github.com/belunatic"><GitHubIcon /></a> /
                    <a href="https://www.linkedin.com/in/abel-sila-24b4a97a/"><LinkedInIcon /></a>
                </p>
                <p className="mt-1 font-bold text-sm">Matthew Neie
                    <a className="ml-1" href="https://github.com/MatthewNeie"><GitHubIcon /></a> /
                    <a href="https://www.linkedin.com/in/matthew-neie"><LinkedInIcon /></a>
                </p>
            </div>
            <div className="ml-10 mt-2 mb-2">
                <p className="mt-1 font-bold text-sm">Alex Singh
                    <a className="ml-1" href="https://github.com/singhalex"><GitHubIcon /></a> /
                    <a href="https://www.linkedin.com/in/kaur-singh-748000254/"><LinkedInIcon /></a>
                </p>
                <p className="mt-1 font-bold text-sm">Bolaji
                    <a className="ml-1" href="https://github.com/Anuoluwatobi"><GitHubIcon /></a> /
                    <a href="https://www.linkedin.com/in/anuoluwatobi-majesty-bolaji-734583237/"><LinkedInIcon /></a>
                </p>
                <p className="mt-1 font-bold text-sm">Smiti Mishra
                    <a className="ml-1" href="https://github.com/SM171906"><GitHubIcon /></a> /
                    <a href="https://www.linkedin.com/in/smitimishra/"><LinkedInIcon /></a>
                </p>
                <p className="mt-1 font-bold text-sm">Abby Nyhof
                    <a className="ml-1" href="https://github.com/abbynyhof"><GitHubIcon /></a> /
                    <a href="https://www.linkedin.com/in/abbynyhof/"><LinkedInIcon /></a>
                </p>
            </div>
        </div>
        <p className="text-center text-sm font-normal">see GitHub repository <a href="https://github.com/chingu-voyages/v51-tier2-team-28">here</a></p>
        <p className="text-center italic text-xs font-normal">Chingu Voyages</p>
    </div>
  )
}

export default FooterHome;