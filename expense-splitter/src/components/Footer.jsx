import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <div className="bg-sky-100">
      <h1 className="bg-blue-300 text-center">Application Creators</h1>
      <div className="flex justify-center text-center">
        <div className="mb-2 mr-10 mt-2">
          <p>
            Kris
            <a className="ml-1" href="https://github.com/kristi-h">
              <GitHubIcon />
            </a>{" "}
            /
            <a href="">
              <LinkedInIcon />
            </a>
          </p>
          <p>
            Maya
            <a className="ml-1" href="https://github.com/maya17power">
              <GitHubIcon />
            </a>{" "}
            /
            <a href="">
              <LinkedInIcon />
            </a>
          </p>
          <p>
            Carlos
            <a className="ml-1" href="https://github.com/ccespedes">
              <GitHubIcon />
            </a>{" "}
            /
            <a href="">
              <LinkedInIcon />
            </a>
          </p>
          <p>
            Abel
            <a className="ml-1" href="https://github.com/belunatic">
              <GitHubIcon />
            </a>{" "}
            /
            <a href="https://www.linkedin.com/in/abel-sila-24b4a97a/">
              <LinkedInIcon />
            </a>
          </p>
          <p>
            Matthew
            <a className="ml-1" href="https://github.com/MatthewNeie">
              <GitHubIcon />
            </a>{" "}
            /
            <a href="https://www.linkedin.com/in/matthew-neie">
              <LinkedInIcon />
            </a>
          </p>
        </div>
        <div className="mb-2 ml-10 mt-2">
          <p>
            Alex
            <a className="ml-1" href="https://github.com/singhalex">
              <GitHubIcon />
            </a>{" "}
            /
            <a href="https://www.linkedin.com/in/kaur-singh-748000254/">
              <LinkedInIcon />
            </a>
          </p>
          <p>
            Bolaji
            <a className="ml-1" href="https://github.com/Anuoluwatobi">
              <GitHubIcon />
            </a>{" "}
            /
            <a href="">
              <LinkedInIcon />
            </a>
          </p>
          <p>
            Smiti
            <a className="ml-1" href="https://github.com/SM171906">
              <GitHubIcon />
            </a>{" "}
            /
            <a href="https://www.linkedin.com/in/smitimishra/">
              <LinkedInIcon />
            </a>
          </p>
          <p>
            Abby
            <a className="ml-1" href="https://github.com/abbynyhof">
              <GitHubIcon />
            </a>{" "}
            /
            <a href="https://www.linkedin.com/in/abbynyhof/">
              <LinkedInIcon />
            </a>
          </p>
        </div>
      </div>
      <p className="text-center">Chingu Voyages</p>
    </div>
  );
};

export default Footer;
