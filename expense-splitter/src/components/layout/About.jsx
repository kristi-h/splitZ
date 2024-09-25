import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const About = () => {

    const team = [
        {name: "Kristi",
         role: "Role",
         gitHubUrl: "https://github.com/kristi-h",
         linkedInUrl: "",
        },
        {name: "Carlos Cespedes",
         role: "Developer",
         gitHubUrl: "https://github.com/ccespedes",
         linkedInUrl: "",
        },
        {name: "Abel Sila",
         role: "Developer",
         gitHubUrl: "https://github.com/belunatic",
         linkedInUrl: "https://www.linkedin.com/in/abel-sila-24b4a97a/",
        },
        {name: "Matthew Neie",
         role: "Developer",
         gitHubUrl: "https://github.com/MatthewNeie",
         linkedInUrl: "https://linkedin.com/in/matthew-neie",
        },
        {name: "Alex Singh",
         role: "Developer",
         gitHubUrl: "https://github.com/singhalex",
         linkedInUrl: "https://www.linkedin.com/in/kaur-singh-748000254/",
        },
        {name: "Bolaji",
         role: "Product Owner",
         gitHubUrl: "https://github.com/Anuoluwatobi",
         linkedInUrl: "https://www.linkedin.com/in/anuoluwatobi-majesty-bolaji-734583237/",
        },
        {name: "Smiti Mishra",
         role: "Scrum Master",
         gitHubUrl: "https://github.com/SM171906",
         linkedInUrl: "https://www.linkedin.com/in/smitimishra/",
        },
        {name: "Abby Nyhof",
         role: "UX Designer",
         gitHubUrl: "https://github.com/abbynyhof",
         linkedInUrl: "https://www.linkedin.com/in/abbynyhof/",
        },
    ]

  return (
    <div>
        <div>
        {team.map((item) => (
            <div className="flex justify-between border-2 border-[#05299e] rounded-lg items-center p-2 mb-2">
                <h2>{item.name}
                    <p className="text-sm text-gray-400">{item.role}</p>
                </h2>
                <div>
                    <a className="mr-4" href={item.gitHubUrl}><GitHubIcon /></a>
                    <a className="mr-2" href={item.linkedInUrl}><LinkedInIcon /></a>
                </div>
            </div>))}
        </div>
        <p className="text-center mb-1 mt-1">see GitHub repository 
            <a className="cursor-pointer" href="https://github.com/chingu-voyages/v51-tier2-team-28"> here</a>
        </p>
        <p className="text-center italic text-sm">Chingu Voyages</p>
    </div>
  )
}

export default About;