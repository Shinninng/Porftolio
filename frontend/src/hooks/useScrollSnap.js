import { useEffect } from 'react';

/**
 * Hook personalizado para implementar scroll snap y navegación suave
 * Integra la funcionalidad de scroll-snap.js como un hook React
 */
export const useScrollSnap = () => {
  useEffect(() => {
    // Detectar si el navegador soporta scroll-snap
    const supportsScrollSnap = CSS.supports('scroll-snap-type', 'y mandatory');

    if (supportsScrollSnap) {
      console.log('✓ Scroll Snapping soportado');
    } else {
      console.log('✗ Scroll Snapping no soportado - usando alternativa');
      addScrollSnapPolyfill();
    }

    // Funcionalidad del botón de siguiente sección (flecha)
    const nextSectionBtn = document.getElementById('nextSectionBtn');
    if (nextSectionBtn) {
      nextSectionBtn.addEventListener('click', handleNextSection);
    }

    // Agregar efecto visual al navegar
    const navLinks = document.querySelectorAll('.nav-pill');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    // Botón Home - volver al inicio
    const homeBtn = document.querySelector('a[href="#"]');
    if (homeBtn) {
      homeBtn.addEventListener('click', handleHomeClick);
    }

    return () => {
      if (nextSectionBtn) {
        nextSectionBtn.removeEventListener('click', handleNextSection);
      }
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
      if (homeBtn) {
        homeBtn.removeEventListener('click', handleHomeClick);
      }
    };
  }, []);
};

const handleNextSection = () => {
  const sections = document.querySelectorAll('section');
  const currentScroll = window.scrollY + window.innerHeight / 2;
  let nextSection = null;

  // Encontrar la siguiente sección
  for (let section of sections) {
    if (section.offsetTop > currentScroll) {
      nextSection = section;
      break;
    }
  }

  // Si no hay más secciones, volver al inicio
  if (!nextSection) {
    nextSection = sections[0];
  }

  if (nextSection) {
    nextSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const handleNavClick = (e) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const handleHomeClick = (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Polyfill para navegadores que no soportan scroll-snap
function addScrollSnapPolyfill() {
  let isScrolling = false;
  const scrollDelay = 800; // milisegundos

  window.addEventListener('wheel', function(e) {
    if (isScrolling) return;

    const sections = document.querySelectorAll('section');
    const currentScroll = window.scrollY;
    let nextSection = null;

    if (e.deltaY > 0) {
      // Scroll hacia abajo
      for (let section of sections) {
        if (section.offsetTop > currentScroll + 100) {
          nextSection = section;
          break;
        }
      }
    } else {
      // Scroll hacia arriba
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop < currentScroll - 100) {
          nextSection = sections[i];
          break;
        }
      }
    }

    if (nextSection) {
      isScrolling = true;
      nextSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        isScrolling = false;
      }, scrollDelay);
    }
  }, { passive: true });
}
