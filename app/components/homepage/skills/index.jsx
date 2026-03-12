"use client";
// @flow strict

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";

function Skills() {
  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b] mesh-bg">
      {/* Glow orb */}
      <div className="orb orb-violet w-48 h-48 absolute top-6 left-1/2 opacity-15" />

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center gap-4">
          <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-violet-500" />
          <span className="section-heading text-xl">Skills</span>
          <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-violet-500" />
        </div>
      </div>

      {/* First row - left */}
      <div className="w-full my-6">
        <Marquee gradient={false} speed={60} pauseOnHover direction="left">
          {skillsData.slice(0, Math.ceil(skillsData.length / 2)).map((skill, id) => {
            const skillImg = skillsImage(skill);
            return (
              <div
                key={id}
                className="skill-card w-36 min-w-fit h-fit flex flex-col items-center justify-center m-3 sm:m-4 rounded-xl cursor-pointer group"
              >
                <div className="h-full w-full rounded-xl border border-[#1f223c] bg-gradient-to-b from-[#11152c] to-[#0d1224] group-hover:bg-gradient-to-b group-hover:from-[#1a1443] group-hover:to-[#0d1224] transition-all duration-300 relative overflow-hidden">
                  {/* Top shimmer line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                  <div className="flex flex-col items-center justify-center gap-3 p-5">
                    {skillImg && (
                      <div className="h-9 sm:h-10 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]">
                        <Image
                          src={skillImg.src}
                          alt={skill}
                          width={40}
                          height={40}
                          className="h-full rounded-lg"
                          style={{ width: "auto" }}
                        />
                      </div>
                    )}
                    <p className="text-gray-300 group-hover:text-white text-sm sm:text-base font-medium transition-colors duration-300">
                      {skill}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Marquee>
      </div>

      {/* Second row - right */}
      <div className="w-full my-6">
        <Marquee gradient={false} speed={50} pauseOnHover direction="right">
          {skillsData.slice(Math.ceil(skillsData.length / 2)).map((skill, id) => {
            const skillImg = skillsImage(skill);
            return (
              <div
                key={id}
                className="skill-card w-36 min-w-fit h-fit flex flex-col items-center justify-center m-3 sm:m-4 rounded-xl cursor-pointer group"
              >
                <div className="h-full w-full rounded-xl border border-[#1f223c] bg-gradient-to-b from-[#11152c] to-[#0d1224] group-hover:from-[#0d1224] group-hover:to-[#0a0d37] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#16f2b3]/40 to-transparent" />
                  <div className="flex flex-col items-center justify-center gap-3 p-5">
                    {skillImg && (
                      <div className="h-9 sm:h-10 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(22,242,179,0.5)]">
                        <Image
                          src={skillImg.src}
                          alt={skill}
                          width={40}
                          height={40}
                          className="h-full rounded-lg"
                          style={{ width: "auto" }}
                        />
                      </div>
                    )}
                    <p className="text-gray-300 group-hover:text-[#16f2b3] text-sm sm:text-base font-medium transition-colors duration-300">
                      {skill}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}

export default Skills;
