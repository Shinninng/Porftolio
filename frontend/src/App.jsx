import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Briefcase, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Moon, 
  Sun,
  Code,
  Send,
  CheckCircle,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error

  // Smooth Scroll & Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && 
            element.offsetTop <= scrollPosition && 
            (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Toggle
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Form Submit - Enviar a Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        setFormData({ subject: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
        console.error('Error del servidor:', data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setFormStatus('error');
    }
  };

  const navLinks = [
    { id: 'hero', icon: <Home size={24} />, label: 'Inicio' },
    { id: 'projects', icon: <Briefcase size={24} />, label: 'Proyectos' },
    { id: 'contact', icon: <Mail size={24} />, label: 'Contacto' },
  ];

  const projects = [
    {
      title: "E-Commerce Dashboard",
      tech: ["React", "Firebase", "Tailwind"],
      desc: "Panel administrativo completo con gestión de inventario en tiempo real.",
      link: "#"
    },
    {
      title: "Juego Unity 2D",
      tech: ["C#", "Unity", "WebGL"],
      desc: "Plataformero pixel-art con mecánicas de física avanzadas.",
      link: "#"
    },
    {
      title: "Chat App en Tiempo Real",
      tech: ["Node.js", "Socket.io", "MongoDB"],
      desc: "Aplicación de mensajería con salas privadas y encriptación.",
      link: "#"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${theme === 'dark' ? 'bg-[#142738] text-white' : 'bg-gray-100 text-gray-900'}`}>
      
      {/* Styles for specific fonts and animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@300;400;600;700&display=swap');
        
        .font-code { font-family: 'Fira Code', monospace; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        /* Custom Colors variables wrapper */
        :root {
          --color-accent-primary: #65b8a6;
          --color-accent-secondary: #b5e8c3;
          --color-bg-card: #1f192f;
        }

        .glass-nav {
          background: rgba(31, 25, 47, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        /* Light mode overrides for glass */
        .light .glass-nav {
           background: rgba(255, 255, 255, 0.8);
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      {/* Navigation (Sidebar Desktop / Bottom Mobile) */}
      <nav className={`fixed z-50 transition-all duration-300
        md:left-0 md:top-0 md:h-full md:w-20 md:flex-col
        bottom-0 w-full h-16 flex-row
        flex items-center justify-center glass-nav border-t md:border-t-0 md:border-r border-[#65b8a6]/20
      `}>
        <div className="flex md:flex-col gap-8 justify-center items-center w-full">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setActiveSection(link.id)}
              aria-label={link.label}
              className={`p-3 rounded-xl transition-all duration-300 relative group
                ${activeSection === link.id 
                  ? 'text-[#65b8a6] bg-[#65b8a6]/10 scale-110 shadow-[0_0_15px_rgba(101,184,166,0.3)]' 
                  : 'text-[#9ca3af] hover:text-white hover:bg-white/5'
                }`}
            >
              {link.icon}
              {/* Tooltip for desktop */}
              <span className="hidden md:block absolute left-14 bg-[#1f192f] text-[#b5e8c3] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#65b8a6]/20 pointer-events-none">
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* Theme Toggle in Nav */}
        <button
          onClick={toggleTheme}
          className="absolute md:bottom-8 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 p-2 rounded-full text-[#9ca3af] hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-20 pb-20 md:pb-0">
        
        {/* HERO SECTION */}
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background Gradient (Simulating Video) */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#142738] via-[#1f192f] to-[#0f172a] animate-gradient-xy">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            {/* Abstract animated shapes */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#65b8a6]/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#b5e8c3]/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl">
            <p className="text-[#65b8a6] font-code mb-4 text-lg md:text-xl tracking-wider animate-fade-in-down">
              👋 Hola, mundo.
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#65b8a6] to-[#b5e8c3]">RekCutPleh</span>
            </h1>
            <p className="text-[#9ca3af] text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Desarrollador Full Stack creativo enfocado en experiencias digitales inmersivas y funcionales.
            </p>
            
            <a 
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#65b8a6] text-[#142738] font-bold rounded-full hover:bg-[#b5e8c3] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(101,184,166,0.5)]"
            >
              Explorar Trabajo
              <Briefcase size={20} />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#9ca3af]">
            <div className="w-6 h-10 border-2 border-[#9ca3af] rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-[#65b8a6] rounded-full"></div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 px-6 md:px-12 min-h-screen flex flex-col justify-center">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-[#9ca3af]/30 flex-1"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#b5e8c3]">Proyectos Destacados</h2>
              <div className="h-px bg-[#9ca3af]/30 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <article 
                  key={index}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2
                    ${theme === 'dark' ? 'bg-[#1f192f]' : 'bg-white shadow-lg'}
                    border border-transparent hover:border-[#65b8a6]/50
                  `}
                >
                  {/* Card Content */}
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <Code size={32} className="text-[#65b8a6]" />
                      <a href={project.link} className="text-[#9ca3af] hover:text-[#65b8a6] transition-colors" aria-label={`Ver ${project.title}`}>
                        <ExternalLink size={20} />
                      </a>
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} group-hover:text-[#65b8a6] transition-colors`}>
                      {project.title}
                    </h3>
                    
                    <p className="text-[#9ca3af] mb-6 flex-grow text-sm leading-relaxed">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-xs font-code px-2 py-1 rounded bg-[#65b8a6]/10 text-[#65b8a6]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 px-6 md:px-12 min-h-screen flex items-center justify-center relative">
          <div className="max-w-4xl mx-auto w-full relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#b5e8c3] mb-4">Hablemos</h2>
              <p className="text-[#9ca3af]">¿Tienes una idea o propuesta? Envíame un mensaje.</p>
            </div>

            <div className={`p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-sm border border-[#65b8a6]/10
              ${theme === 'dark' ? 'bg-[#1f192f]/80' : 'bg-white/90'}
            `}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#9ca3af]">Tu Email</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="hola@ejemplo.com"
                      className={`w-full p-4 rounded-xl outline-none border-2 transition-all duration-300
                        ${theme === 'dark' 
                          ? 'bg-[#142738] border-[#142738] focus:border-[#65b8a6] text-white placeholder-[#9ca3af]/50' 
                          : 'bg-gray-50 border-gray-200 focus:border-[#65b8a6] text-gray-900'}
                      `}
                    />
                  </div>

                  {/* Subject Select */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-[#9ca3af]">Asunto</label>
                    <div className="relative">
                      <select 
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className={`w-full p-4 rounded-xl outline-none border-2 appearance-none cursor-pointer transition-all duration-300
                          ${theme === 'dark' 
                            ? 'bg-[#142738] border-[#142738] focus:border-[#65b8a6] text-white' 
                            : 'bg-gray-50 border-gray-200 focus:border-[#65b8a6] text-gray-900'}
                        `}
                      >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="freelance">Proyecto Freelance</option>
                        <option value="job">Oportunidad Laboral</option>
                        <option value="collab">Colaboración</option>
                        <option value="other">Otro</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#9ca3af]">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[#9ca3af]">Mensaje</label>
                  <textarea 
                    id="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Cuéntame sobre tu proyecto..."
                    className={`w-full p-4 rounded-xl outline-none border-2 transition-all duration-300 resize-none
                      ${theme === 'dark' 
                        ? 'bg-[#142738] border-[#142738] focus:border-[#65b8a6] text-white placeholder-[#9ca3af]/50' 
                        : 'bg-gray-50 border-gray-200 focus:border-[#65b8a6] text-gray-900'}
                    `}
                  ></textarea>
                </div>

                {/* Submit Button & Status */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
                  <button 
                    type="submit"
                    disabled={formStatus === 'loading' || formStatus === 'success'}
                    className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
                      ${formStatus === 'success' 
                        ? 'bg-[#4CAF50] text-white cursor-default'
                        : 'bg-[#65b8a6] text-[#142738] hover:bg-[#b5e8c3] hover:shadow-[0_0_20px_rgba(101,184,166,0.4)]'}
                      disabled:opacity-70 disabled:cursor-not-allowed
                    `}
                  >
                    {formStatus === 'loading' && (
                      <div className="w-5 h-5 border-2 border-[#142738] border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {formStatus === 'success' && <CheckCircle size={20} />}
                    {formStatus === 'idle' && <Send size={20} />}
                    
                    {formStatus === 'loading' ? 'Enviando...' : 
                     formStatus === 'success' ? '¡Mensaje Enviado!' : 'Enviar Mensaje'}
                  </button>

                  {/* Feedback Messages */}
                  {formStatus === 'error' && (
                    <div className="flex items-center gap-2 text-[#F44336] animate-pulse">
                      <AlertCircle size={18} />
                      <span className="text-sm">Por favor completa todos los campos.</span>
                    </div>
                  )}
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-[#9ca3af]/10 flex justify-center gap-6">
                 <a href="#" className="text-[#9ca3af] hover:text-[#65b8a6] transition-colors"><Github /></a>
                 <a href="#" className="text-[#9ca3af] hover:text-[#0077b5] transition-colors"><Linkedin /></a>
                 <a href="mailto:hola@rekcutpleh.com" className="text-[#9ca3af] hover:text-[#F44336] transition-colors"><Mail /></a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;