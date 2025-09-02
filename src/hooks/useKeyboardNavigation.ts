import { useEffect, useState } from 'react';

interface Section {
  id: string;
  element: HTMLElement;
}

export function useKeyboardNavigation() {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [sections, setSections] = useState<Section[]>([]);

  // Section order based on the page layout
  const sectionIds = [
    'hero-section',
    'process',
    'bento-offer',
    'remote',
    'team',
    'testimonials',
    'faq',
    'cal-widget'
  ];

  useEffect(() => {
    // Find all sections in the DOM
    const foundSections: Section[] = [];
    
    sectionIds.forEach((id) => {
      let element: HTMLElement | null = null;
      
      // Get element by ID
      element = document.getElementById(id);
      
      if (element) {
        foundSections.push({ id, element });
      }
    });

    setSections(foundSections);
  }, []);

  // Function to scroll to a section
  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      const section = sections[index];
      section.element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      setCurrentSection(index);
    }
  };

  // Function to go to next section
  const nextSection = () => {
    const nextIndex = Math.min(currentSection + 1, sections.length - 1);
    scrollToSection(nextIndex);
  };

  // Function to go to previous section
  const prevSection = () => {
    const prevIndex = Math.max(currentSection - 1, 0);
    scrollToSection(prevIndex);
  };

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle arrows if no input is focused and specific conditions are met
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA' ||
          document.activeElement?.tagName === 'BUTTON' ||
          document.activeElement?.contentEditable === 'true' ||
          document.activeElement?.closest('[role="dialog"]') ||
          document.activeElement?.closest('[role="menu"]')) {
        return;
      }

      // Only handle if Ctrl or Alt is pressed (more intentional navigation)
      if (!event.ctrlKey && !event.altKey) {
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          nextSection();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          prevSection();
          break;
        case 'Home':
          event.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          event.preventDefault();
          scrollToSection(sections.length - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, sections]);

  // Track current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const rect = section.element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;
        
        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          setCurrentSection(index);
        }
      });
    };

    // Throttle scroll events with better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [sections]);

  return {
    currentSection,
    totalSections: sections.length,
    nextSection,
    prevSection,
    sections
  };
}