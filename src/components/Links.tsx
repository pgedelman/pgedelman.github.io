import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaCode } from 'react-icons/fa';
import { profile } from '../data/content';

const items = [
  { href: profile.links.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
  { href: profile.links.github, label: 'GitHub', Icon: FaGithub },
  { href: profile.links.leetcode, label: 'LeetCode', Icon: FaCode },
  { href: profile.links.instagram, label: 'Instagram', Icon: FaInstagram },
];

export default function Links({ size = 22 }: { size?: number }) {
  return (
    <div className="links">
      {items.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
          {/* @ts-ignore */}
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
