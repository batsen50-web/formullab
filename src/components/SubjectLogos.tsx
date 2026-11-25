import {Atom, Dna, Feather, Globe2, Landmark, Layers, Scale} from 'lucide-react';
import type {FC} from 'react';

interface LogoProps {
  size?: 'md' | 'lg';
}

export const HomeLogo: FC<LogoProps> = ({size = 'md'}) => {
  const boxClass = size === 'lg' ? 'w-12 h-12 rounded-xl' : 'w-9 h-9 rounded-xl';
  const iconClass = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div
      className={`${boxClass} bg-zinc-900 border border-zinc-600/50 flex items-center justify-center shadow-[0_0_16px_rgba(161,161,170,0.16)] shrink-0`}
      aria-hidden="true"
    >
      <Layers className={`${iconClass} text-zinc-200`} />
    </div>
  );
};

export const ErlenmeyerLogo: FC<LogoProps> = ({size = 'md'}) => {
  const boxClass = size === 'lg' ? 'w-12 h-12 rounded-xl' : 'w-9 h-9 rounded-xl';
  const iconClass = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div
      className={`${boxClass} bg-[#0e3225]/90 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_18px_rgba(52,211,153,0.32)] shrink-0`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`${iconClass} text-[#4ae39e]`}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 3h6" />
        <path d="M10 3v5.4L5.2 17.6A2 2 0 0 0 7 20.5h10a2 2 0 0 0 1.8-2.9L14 8.4V3" />
        <path d="M7.6 15.5h8.8" strokeOpacity="0.6" />
        <circle cx="10.5" cy="17.8" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="13.8" cy="17.2" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
};

export const BioDnaLogo: FC<LogoProps> = ({size = 'md'}) => {
  const boxClass = size === 'lg' ? 'w-12 h-12 rounded-xl' : 'w-9 h-9 rounded-xl';
  const iconClass = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div
      className={`${boxClass} bg-[#0b2a3c]/95 border border-sky-400/45 flex items-center justify-center shadow-[0_0_18px_rgba(56,189,248,0.32)] shrink-0`}
      aria-hidden="true"
    >
      <Dna className={`${iconClass} text-[#38bdf8]`} />
    </div>
  );
};

export const PhysicsAtomLogo: FC<LogoProps> = ({size = 'md'}) => {
  const boxClass = size === 'lg' ? 'w-12 h-12 rounded-xl' : 'w-9 h-9 rounded-xl';
  const iconClass = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div
      className={`${boxClass} bg-[#1c103b]/95 border border-violet-400/45 flex items-center justify-center shadow-[0_0_18px_rgba(167,139,250,0.34)] shrink-0`}
      aria-hidden="true"
    >
      <Atom className={`${iconClass} text-[#a78bfa]`} />
    </div>
  );
};

export const GeographyGlobeLogo: FC<LogoProps> = ({size = 'md'}) => {
  const boxClass = size === 'lg' ? 'w-12 h-12 rounded-xl' : 'w-9 h-9 rounded-xl';
  const iconClass = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div
      className={`${boxClass} bg-[#2b1a09]/95 border border-amber-400/45 flex items-center justify-center shadow-[0_0_18px_rgba(245,158,11,0.32)] shrink-0`}
      aria-hidden="true"
    >
      <Globe2 className={`${iconClass} text-[#fbbf24]`} />
    </div>
  );
};

export const LiteratureQuillLogo: FC<LogoProps> = ({size = 'md'}) => {
  const boxClass = size === 'lg' ? 'w-12 h-12 rounded-xl' : 'w-9 h-9 rounded-xl';
  const iconClass = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div
      className={`${boxClass} bg-[#320d1b]/95 border border-rose-400/45 flex items-center justify-center shadow-[0_0_18px_rgba(244,63,94,0.34)] shrink-0`}
      aria-hidden="true"
    >
      <Feather className={`${iconClass} text-[#fb7185]`} />
    </div>
  );
};

export const HistoryLandmarkLogo: FC<LogoProps> = ({size = 'md'}) => {
  const boxClass = size === 'lg' ? 'w-12 h-12 rounded-xl' : 'w-9 h-9 rounded-xl';
  const iconClass = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div
      className={`${boxClass} bg-[#331708]/95 border border-orange-400/45 flex items-center justify-center shadow-[0_0_18px_rgba(249,115,22,0.34)] shrink-0`}
      aria-hidden="true"
    >
      <Landmark className={`${iconClass} text-[#fb923c]`} />
    </div>
  );
};

export const ReligionStarLogo: FC<LogoProps> = ({size = 'md'}) => {
  const boxClass = size === 'lg' ? 'w-12 h-12 rounded-xl' : 'w-9 h-9 rounded-xl';
  const iconClass = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div
      className={`${boxClass} bg-[#062929]/95 border border-teal-400/45 flex items-center justify-center shadow-[0_0_18px_rgba(20,184,166,0.34)] shrink-0`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`${iconClass} text-[#2dd4bf]`}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="6" width="12" height="12" rx="1" />
        <rect x="6" y="6" width="12" height="12" rx="1" transform="rotate(45 12 12)" />
        <circle cx="12" cy="12" r="2.1" />
      </svg>
    </div>
  );
};

export const PhilosophyScaleLogo: FC<LogoProps> = ({size = 'md'}) => {
  const boxClass = size === 'lg' ? 'w-12 h-12 rounded-xl' : 'w-9 h-9 rounded-xl';
  const iconClass = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div
      className={`${boxClass} bg-[#131942]/95 border border-indigo-400/45 flex items-center justify-center shadow-[0_0_18px_rgba(99,102,241,0.36)] shrink-0`}
      aria-hidden="true"
    >
      <Scale className={`${iconClass} text-[#818cf8]`} />
    </div>
  );
};
