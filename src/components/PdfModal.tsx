import React, { useEffect } from 'react';
import { FaTimes, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  src: string;
  downloadName?: string;
  accent?: string;
  children?: React.ReactNode;
}

/** Full-screen PDF viewer with download / open-in-new-tab, closes on Esc or backdrop click. */
export default function PdfModal({ open, onClose, title, subtitle, src, downloadName, accent, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  const url = encodeURI(src);
  return (
    <div className="pdf-modal" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div
        className="pdf-modal__panel"
        style={{ '--accent': accent } as React.CSSProperties}
        onClick={e => e.stopPropagation()}
      >
        <header className="pdf-modal__head">
          <div>
            <h3>{title}</h3>
            {subtitle && <p className="pdf-modal__sub">{subtitle}</p>}
          </div>
          <button className="pdf-modal__close" onClick={onClose} aria-label="Close">
            {/* @ts-ignore */}
            <FaTimes />
          </button>
        </header>
        {children && <div className="pdf-modal__extra">{children}</div>}
        <div className="pdf-modal__actions">
          <a href={url} download={downloadName}>
            {/* @ts-ignore */}
            <FaDownload /> Download
          </a>
          <a href={url} target="_blank" rel="noreferrer">
            {/* @ts-ignore */}
            <FaExternalLinkAlt /> Open in new tab
          </a>
        </div>
        <iframe className="pdf-modal__frame" src={url} title={title} />
      </div>
    </div>
  );
}
