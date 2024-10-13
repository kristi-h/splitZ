import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const FooterHome = () => {
  return (
    <div className="mt-auto bg-sky-100 opacity-25">
      <h2 className="bg-blue-300 text-center">Our Team</h2>
      <div className="flex justify-center text-center">
        <div className="mb-2 mt-2">
          <p className="mt-1 text-sm font-bold">
            Kristi
            <a
              className="ml-1"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/kristi-h"
            >
              <GitHubIcon />
            </a>{" "}
            /
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/kristi-h-4542b38a/"
            >
              <LinkedInIcon />
            </a>
          </p>
          <p className="mt-1 text-sm font-bold">
            Carlos Cespedes
            <a
              className="ml-1"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/ccespedes"
            >
              <GitHubIcon />
            </a>{" "}
            /
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/carlos-cespedes-054a847/"
            >
              <LinkedInIcon />
            </a>
          </p>
          <p className="mt-1 text-sm font-bold">
            Abel Sila
            <a
              className="ml-1"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/belunatic"
            >
              <GitHubIcon />
            </a>{" "}
            /
            <a href="https://www.linkedin.com/in/abel-sila-24b4a97a/">
              <LinkedInIcon />
            </a>
          </p>
          <p className="mt-1 text-sm font-bold">
            Matthew Neie
            <a
              className="ml-1"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/MatthewNeie"
            >
              <GitHubIcon />
            </a>{" "}
            /
            <a href="https://www.linkedin.com/in/matthew-neie">
              <LinkedInIcon />
            </a>
          </p>
        </div>
        <div className="mb-2 ml-10 mt-2">
          <p className="mt-1 text-sm font-bold">
            Alex Singh
            <a
              className="ml-1"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/singhalex"
            >
              <GitHubIcon />
            </a>{" "}
            /
            <a href="https://www.linkedin.com/in/kaur-singh-748000254/">
              <LinkedInIcon />
            </a>
          </p>
          <p className="mt-1 text-sm font-bold">
            Bolaji
            <a
              className="ml-1"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Anuoluwatobi"
            >
              <GitHubIcon />
            </a>{" "}
            /
            <a href="https://www.linkedin.com/in/anuoluwatobi-majesty-bolaji-734583237/">
              <LinkedInIcon />
            </a>
          </p>
          <p className="mt-1 text-sm font-bold">
            Smiti Mishra
            <a
              className="ml-1"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/SM171906"
            >
              <GitHubIcon />
            </a>{" "}
            /
            <a href="https://www.linkedin.com/in/smitimishra/">
              <LinkedInIcon />
            </a>
          </p>
          <p className="mt-1 text-sm font-bold">
            Abby Nyhof
            <a
              className="ml-1"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/abbynyhof"
            >
              <GitHubIcon />
            </a>{" "}
            /
            <a href="https://www.linkedin.com/in/abbynyhof/">
              <LinkedInIcon />
            </a>
          </p>
        </div>
      </div>
      <p className="text-center text-sm font-normal">
        see GitHub repository
        <a
          className="cursor-pointer font-bold"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/chingu-voyages/v51-tier2-team-28"
        >
          {" "}
          here
        </a>
      </p>
      <p className="text-center text-xs font-normal italic">Chingu Voyages</p>
    </div>
  );
};

export default FooterHome;
