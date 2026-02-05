import { useMobileMenu } from '../hooks/useMobileMenu';
import { useDarkMode } from '../hooks/useDarkMode';
import { useActiveSection } from '../hooks/useActiveSection';

export const Navigation = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  const { isDark, toggleDarkMode } = useDarkMode();
  const activeSection = useActiveSection();

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Sobre Mi' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'contacto', label: 'Contacto' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="text-xl font-black uppercase tracking-tighter">TF DESIGN</div>
          
          <div className="hidden md:flex items-center gap-6">
            <div id="nav-links" className="flex gap-4">
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`nav-item px-3 py-1 font-bold text-sm uppercase transition-all ${
                    activeSection === link.id ? 'text-red-600' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
            >
              {!isDark ? (
                <i className="fas fa-moon"></i>
              ) : (
                <i className="fas fa-sun text-yellow-400"></i>
              )}
            </button>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white dark:bg-dark-bg z-[60] flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={closeMenu}
          className="absolute top-6 right-6 text-3xl"
        >
          <i className="fas fa-times"></i>
        </button>
        {navLinks.map(link => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="text-2xl font-bold uppercase"
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};
