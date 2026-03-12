// @flow strict

import { certifications } from "@/utils/data/certifications";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import GlowCard from "../../helper/glow-card";

const issuerColors = {
  Oracle: "text-[#f80000]",
  HackerRank: "text-[#00ea64]",
  "Great Learning Academy": "text-[#ff6b35]",
};

function Certifications() {
  return (
    <div id="certifications" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Certifications
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <GlowCard key={cert.id} identifier={`cert-${cert.id}`}>
              <div className="p-5 relative text-white">
                <Image
                  src="/blur-23.svg"
                  alt=""
                  width={1080}
                  height={200}
                  className="absolute bottom-0 opacity-60"
                />
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-2 flex-1">
                    <MdVerified
                      size={20}
                      className={`shrink-0 mt-0.5 ${issuerColors[cert.issuer] ?? 'text-[#16f2b3]'}`}
                    />
                    <p className="text-sm sm:text-base font-medium leading-snug">
                      {cert.title}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{cert.year}</span>
                </div>

                <p className={`text-xs font-semibold mb-2 ${issuerColors[cert.issuer] ?? 'text-[#16f2b3]'}`}>
                  {cert.issuer}
                </p>

                <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cert.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs rounded-full border border-[#2a2e5a] text-gray-300 bg-[#0d1224]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Certifications;
