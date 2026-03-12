"use client";
// @flow strict

import * as React from 'react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({});
  const [glow, setGlow] = useState({ x: 50, y: 50, visible: false });

  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const ry = ((x - cx) / cx) * 10;
    const rx = -((y - cy) / cy) * 10;
    setTilt({ transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.01,1.01,1.01)`, transition: "transform 0.08s linear" });
    setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, visible: true });
  };

  const onLeave = () => {
    setTilt({ transform: "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)", transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)" });
    setGlow(p => ({ ...p, visible: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={tilt}
      className="holo-card project-card-3d from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full"
    >
      {/* Cursor glow overlay */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
        style={{
          opacity: glow.visible ? 1 : 0,
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(22,242,179,0.1) 0%, transparent 55%)`,
        }}
      />

      {/* Top gradient line */}
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600" />
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent" />
      </div>

      {/* Title bar */}
      <div className="px-4 lg:px-8 py-3 lg:py-5 relative">
        <div className="flex flex-row space-x-1 lg:space-x-2 absolute top-1/2 -translate-y-1/2">
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400 shadow-[0_0_4px_rgba(248,113,113,0.8)]" />
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400 shadow-[0_0_4px_rgba(251,146,60,0.8)]" />
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-200 shadow-[0_0_4px_rgba(134,239,172,0.8)]" />
        </div>
        <p className="text-center ml-3 text-[#16f2b3] text-base lg:text-xl font-medium tracking-wide">
          {project.name}
        </p>
      </div>

      {/* Code block */}
      <div className="overflow-x-auto border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-xs md:text-sm lg:text-base">
          <div className="blink">
            <span className="mr-2 text-pink-500">const</span>
            <span className="mr-2 text-white">project</span>
            <span className="mr-2 text-pink-500">=</span>
            <span className="text-gray-400">{'{'}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
            <span className="text-gray-400">{`'`}</span>
            <span className="text-amber-300">{project.name}</span>
            <span className="text-gray-400">{`',`}</span>
          </div>
          <div className="ml-4 lg:ml-8 mr-2">
            <span className="text-white">tools:</span>
            <span className="text-gray-400">{` ['`}</span>
            {project.tools.map((tag, i) => (
              <React.Fragment key={i}>
                <span className="text-amber-300">{tag}</span>
                {project.tools?.length - 1 !== i && <span className="text-gray-400">{`', '`}</span>}
              </React.Fragment>
            ))}
            <span className="text-gray-400">{"],"}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">myRole:</span>
            <span className="text-orange-400">{project.role}</span>
            <span className="text-gray-400">,</span>
          </div>
          <div className="ml-4 lg:ml-8 mr-2">
            <span className="text-white">description:</span>
            <span className="text-cyan-400">{' ' + project.description}</span>
            <span className="text-gray-400">,</span>
          </div>
          <div><span className="text-gray-400">{`};`}</span></div>
        </code>

        {project.code && (
          <div className="mt-4 flex justify-end">
            <Link
              href={project.code}
              target="_blank"
              className="group flex items-center gap-2 text-sm text-gray-400 hover:text-[#16f2b3] transition-all duration-300"
            >
              <BsGithub size={18} className="group-hover:drop-shadow-[0_0_6px_#16f2b3] transition-all duration-300" />
              <span className="group-hover:underline underline-offset-2">View on GitHub</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
