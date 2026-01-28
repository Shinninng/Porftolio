import React, { useState, useEffect } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

/**
 * Componente PortfolioGame - Adaptación del portfolio de Tiziano Flores
 * Integra estilos y contenido del archivo index.html original
 */
const PortfolioGame = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);

  // Skills del portfolio
  const skills = [
    { name: 'Originalidad', percentage: 90 },
    { name: 'Narrative Design', percentage: 85 },
    { name: 'Diseño Visual', percentage: 88 },
    { name: 'Programacion', percentage: 75 },
    { name: 'Level Design', percentage: 95 },
    { name: 'Game Design', percentage: 98 },
    { name: 'System Design', percentage: 92 }
  ];

  const projects = Array(6).fill(null).map((_, i) => ({
    id: i,
    title: `Proyecto ${String.fromCharCode(88 + i)}`,
    image: `https://via.placeholder.com/400x300/cbd5e1/64748b?text=Proyecto+${i + 1}`,
    description: 'XXXXXXXXXX'
  }));

  const faqs = [
    {
      question: '¿Que software usas para desarrollar videojuegos?',
      answer: 'XXXXXXXXXXXXXXX'
    },
    {
      question: '¿Que tipo de proyectos y plataformas crees que son las mas adecuadas?',
      answer: 'XXXXXXXXXXXXXXX'
    },
    {
      question: '¿Necesitas ayuda para conceptualizar ideas para videojuegos?',
      answer: 'XXXXXXXXXXXXXXX'
    }
  ];

  // Smooth scroll to next section
  const scrollToNextSection = () => {
    const sections = document.querySelectorAll('[data-section]');
    const currentScroll = window.scrollY + window.innerHeight / 2;
    let nextSection = null;

    for (let section of sections) {
      if (section.offsetTop > currentScroll) {
        nextSection = section;
        break;
      }
    }

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

  // Smooth scroll & spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.getAttribute('data-section'));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-custom-gray text-gray-800 font-montserrat scroll-smooth">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
        
        body { font-family: 'Montserrat', sans-serif; }
        .bg-custom-gray { background-color: #e2e5f0; }
        .text-dark-blue { color: #1e2a4a; }
        .skill-bar { height: 20px; border: 3px solid #000; background: #fff; }
        .skill-progress { background-color: #d10000; height: 100%; border-right: 3px solid #000; }
        .nav-pill { background: white; border-radius: 999px; padding: 4px 16px; transition: all 0.3s; border: 1px solid transparent; }
        .nav-pill:hover { background: #f0f0f0; border-color: #ccc; }
        
        /* Scroll Snap Styles */
        html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
        section { scroll-snap-align: start; scroll-snap-stop: always; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #e2e5f0; }
        ::-webkit-scrollbar-thumb { background: #d10000; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #a00000; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-6 left-6 right-6 z-50 flex gap-2 md:gap-4 items-center justify-between">
        <a
          href="#hero"
          className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:scale-110 transition font-bold uppercase text-sm"
        >
          🏠 Home
        </a>
        <div className="hidden md:flex gap-2 bg-white/30 backdrop-blur-md p-2 rounded-full shadow-sm">
          <a href="#sobre-mi" className="nav-pill text-xs font-bold uppercase">Sobre Mi</a>
          <a href="#proyectos" className="nav-pill text-xs font-bold uppercase">Proyectos</a>
          <a href="#valoracion" className="nav-pill text-xs font-bold uppercase">Valoracion</a>
          <a href="#contacto" className="nav-pill text-xs font-bold uppercase">Contacto</a>
        </div>
        <button
          id="nextSectionBtn"
          onClick={scrollToNextSection}
          className="bg-black text-white p-2 rounded-lg cursor-pointer hover:scale-110 transition"
        >
          <ChevronDown size={24} />
        </button>
      </nav>

      {/* HERO SECTION */}
      <section
        data-section="hero"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center px-10 relative overflow-hidden"
      >
        <div className="z-10 text-center md:text-left md:w-1/2">
          <h1 className="text-6xl md:text-8xl font-black text-dark-blue leading-tight">Tiziano Flores</h1>
          <p className="text-lg md:text-xl font-bold tracking-[0.2em] text-dark-blue mt-4 uppercase">
            Game, Narrative and Level-System Designer
          </p>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-computer_23-2149436193.jpg"
            alt="Designer 3D"
            className="w-full max-w-lg drop-shadow-2xl"
          />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        data-section="about"
        id="sobre-mi"
        className="min-h-screen bg-[#c5c9d6] flex items-center px-10 py-20"
      >
        <div className="max-w-4xl ml-auto text-right">
          <h2 className="text-6xl font-black text-dark-blue mb-2 uppercase italic tracking-tighter">
            Sobre Mi
          </h2>
          <div className="w-full h-1 bg-dark-blue mb-8 opacity-20"></div>
          <div className="space-y-6 text-xl text-dark-blue/80 font-medium">
            <p>
              Me especializo en las disciplinas de Game Design, Systems Design y Narrativa Interactiva. Mi enfoque principal reside en la creación de experiencias de juego que posean una identidad distintiva, se sustenten en fundamentos teóricos sólidos y exhiban una claridad mecánica impecable.
            </p>
            <p>Siempre priorizo un diseño centrado en el jugador para garantizar una experiencia atractiva y coherente.</p>
            <p>
              Mi metodología de trabajo se basa en estándares de documentación profesional, la iteración constante y el prototipado funcional y rápido. Esto asegura un desarrollo estructurado y eficiente, capaz de responder a las demandas de producción con precisión y calidad.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        data-section="projects"
        id="proyectos"
        className="min-h-screen bg-custom-gray px-10 flex flex-col items-center justify-center pt-16"
      >
        <div className="text-center mb-16 w-full">
          <h2 className="text-6xl font-black text-dark-blue uppercase">Proyectos</h2>
          <p className="text-3xl font-bold text-dark-blue italic">Game Designer</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto w-full">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer h-80">
              <div className="bg-white p-6 rounded-sm shadow-xl transform group-hover:-translate-y-3 transition h-full flex flex-col">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-2xl font-black text-dark-blue text-center uppercase flex-1">
                  {project.title}
                </h3>
                <p className="text-center text-gray-500 font-bold tracking-widest">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section
        data-section="skills"
        id="valoracion"
        className="min-h-screen bg-[#b8bcc9] px-10 text-center flex flex-col items-center justify-center"
      >
        <div className="w-full">
          <h2 className="text-6xl font-black text-dark-blue uppercase mb-12 italic">Valoracion</h2>

          <div className="flex justify-center gap-10 mb-16">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner text-4xl">
              👍
            </div>
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner text-4xl">
              🧩
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 max-w-5xl mx-auto uppercase font-black text-xl text-dark-blue">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="w-40 text-left">{skill.name}</span>
                <div className="flex-1 skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="min-h-screen bg-custom-gray px-10 flex flex-col items-center justify-center">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-2/3">
            <h2 className="text-6xl font-black text-dark-blue mb-12">Algunas Preguntas?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h4 className="font-black text-lg mb-2">{faq.question}</h4>
                  <p className="text-gray-600 font-bold">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/3 text-8xl">
            <span className="drop-shadow-lg">❓❓</span>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        data-section="contact"
        id="contacto"
        className="min-h-screen bg-custom-gray px-10 flex flex-col items-center justify-center"
      >
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h2 className="text-6xl font-black text-dark-blue mb-10 leading-none">
              LET'S WORK<br />
              TOGETHER!
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="bg-white px-8 py-2 rounded-full font-bold shadow-sm w-32 text-center">
                  PHONE
                </span>
                <span className="font-bold text-dark-blue">XXXXXXXXXXXX</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-white px-8 py-2 rounded-full font-bold shadow-sm w-32 text-center">
                  EMAIL
                </span>
                <span className="font-bold text-dark-blue">XXX@XXXXXXX.COM</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-white px-8 py-2 rounded-full font-bold shadow-sm w-32 text-center">
                  SOCIAL
                </span>
                <div className="flex gap-3 text-2xl">
                  <span>🌐</span> <span>🐦</span> <span>📸</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
            <img
              src="https://img.freepik.com/free-psd/3d-render-hand-pointing-something_23-2149114481.jpg"
              alt="Contact 3D"
              className="w-80 animate-bounce"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark-blue text-white py-6 text-center text-xs opacity-50">
        &copy; 2024 Tiziano Flores - Game Designer Portfolio
      </footer>
    </div>
  );
};

export default PortfolioGame;
