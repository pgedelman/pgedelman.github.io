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
            rootMargin: '-45% 0px -45% 0px',
            threshold: 0,
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
