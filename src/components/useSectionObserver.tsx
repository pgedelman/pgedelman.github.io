import { useEffect, useState } from 'react';

const useSectionObserver = (sectionIds: string[]) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            const id = entry.target.id;
            if (entry.isIntersecting) {
                setActiveId(id);
            }
            });
        },
        {
            root: null,
            rootMargin: '-100px 0px 0px 0px',
            threshold: .6, // Adjust this to control how much of a section must be visible
        }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
};

export default useSectionObserver;
