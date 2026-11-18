import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaCode } from 'react-icons/fa';
import { ACCENTS, profile } from '../data/content';

const items = [
  { href: profile.links.linkedin, label: 'LinkedIn', Icon: FaLinkedin, accent: ACCENTS.blue },
  { href: profile.links.github, label: 'GitHub', Icon: FaGithub, accent: ACCENTS.green },
  { href: profile.links.leetcode, label: 'LeetCode', Icon: FaCode, accent: ACCENTS.gold },
  { href: profile.links.instagram, label: 'Instagram', Icon: FaInstagram, accent: ACCENTS.red },
];

export default function Links({ size = 22 }: { size?: number }) {
  return (
    <div className="links">
      {items.map(({ href, label, Icon, accent }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} style={{ '--accent': accent } as React.CSSProperties}>
          {/* @ts-ignore */}
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
