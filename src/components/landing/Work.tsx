import React from "react";

interface Project {
  id: number;
  tag: string;
  title: string;
  genre: string;
  description: string;
}

const Work: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      tag: "2020 · Feature",
      title: "Echo Boomers",
      genre: "Heist · True Story →",
      description:
        "Based on a true story, five college graduates decide the best way to get back at the unfair economy and live the life they've always wanted is to steal from Chicago's richest and give to themselves.",
    },
    {
      id: 2,
      tag: "2022 · Short",
      title: "OuttaBounds",
      genre: "Drama · Coming of Age →",
      description:
        "Am I my brother's keeper? This is the question at the heart of Outtabounds, a story about brotherhood, coming of age, and the cost of hoop dreams.",
    },
    {
      id: 3,
      tag: "In Development",
      title: "King of Pop (working title)",
      genre: "Documentary · Music →",
      description:
        "The story of 'King of Pop' Michael Jackson. From his childhood as the star of the Jackson 5, through times of abuse by his father Joe Jackson, to breaking away and making the hit album Thriller and claiming his independence as a solo artist.",
    },
    {
      id: 4,
      tag: "In Development",
      title: "Van Gogh (working title)",
      genre: "Biopic · Art →",
      description:
        "An intoxicating biopic about the art world's mad genius, Vincent van Gogh.",
    },
    {
      id: 5,
      tag: "In Development",
      title: "Untitled Grief Drama",
      genre: "Drama →",
      description:
        "A father's loss of his daughter sends him down grief's spiral as he uncovers the truth behind her crash — a tug of war between dark and light.",
    },
    {
      id: 6,
      tag: "In Development",
      title: "Untitled Thriller",
      genre: "Thriller →",
      description:
        "A woman flees her abusive ex with her young son — only to find a far more terrifying monster waiting in their remote sanctuary.",
    },
  ];

  return (
    <section
      id="work"
      className="relative w-full min-h-screen bg-gradient-to-b from-black via-[#0c0309] to-black py-10 px-4 sm:px-6 md:px-10 flex flex-col items-center overflow-hidden select-none"
    >
      
      {/* Deep, high-contrast ambient backdrop glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1E0A15]/20 rounded-full blur-[150px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-start">
        {/* Editorial Section Heading */}
        <div className="flex flex-col mb-10">
          <span className="font-plus text-xs md:text-sm font-medium text-cyan-400 uppercase mb-2 tracking-wide">
            Selected Portfolio
          </span>
          <h2 className="font-plus text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase">
            THE <span className="text-cyan-400">WORK</span>
          </h2>
        </div>

        {/* Sleek Horizontal Index List */}
        <div className="w-full flex flex-col">
          {projects.map((project, idx) => (
            <div
              key={`${project.title}-${idx}`}
              className="group relative w-full border-b border-white/10 last:border-0 py-8 md:py-10 md:px-4 transition-all duration-500 ease-out hover:bg-gradient-to-r hover:from-[#1E0A15]/15 hover:to-transparent overflow-hidden"
            >
              {/* Left edge dynamic spotlight line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

              {/* Layout splits cards into three structured columns */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center">
                
                {/* Column 1: Metadata Tag / Release Phase in a glassmorphic pill */}
                <div className="md:col-span-3 flex items-center">
                  <div className="flex items-center space-x-3 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-full transition-all duration-300 group-hover:border-cyan-500/20 group-hover:bg-[#1E0A15]/10">
                    <span className="text-cyan-500 font-plus font-bold text-[10px] md:text-sm">
                      {project.id < 10 ? `0${project.id}` : project.id}
                    </span>
                    <span className="w-[1px] h-3 bg-white/10" />
                    <span className="font-plus text-[10px] md:text-xs uppercase text-cyan-300 font-semibold tracking-wide">
                      {project.tag}
                    </span>
                  </div>
                </div>

                {/* Column 2: Title and Sub-genre Link */}
                <div className="md:col-span-5 flex flex-col space-y-1.5 transition-transform duration-500 ease-out group-hover:translate-x-4">
                  <h3 className="font-plus text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-cyan-100 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Genre Link with dynamic transform arrow on hover */}
                  <span className="inline-flex items-center font-plus text-xs uppercase text-cyan-500 group-hover:text-cyan-300 transition-colors duration-300">
                    <span>{project.genre}</span>
                  </span>
                </div>

                {/* Column 3: Sleek Description */}
                <div className="md:col-span-4 pl-0 md:pl-6 border-l-0 md:border-l border-white/5 transition-all duration-500 group-hover:border-cyan-500/20">
                  <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed tracking-wide font-plus group-hover:text-white transition-colors duration-300">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;