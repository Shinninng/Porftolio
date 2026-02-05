export const HeroSection = () => {
  const scrollNext = () => {
    const container = document.querySelector('.snap-container');
    container.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="snap-section flex flex-col items-center justify-center px-6 relative"
    >
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-black text-dark-blue dark:text-blue-400 leading-tight">
          Tiziano Flores
        </h1>
        <p className="text-lg font-bold tracking-[0.3em] mt-4 uppercase opacity-70">
          Game & Narrative Designer
        </p>
      </div>
      <div
        className="absolute bottom-10 animate-bounce cursor-pointer"
        onClick={scrollNext}
      >
        <i className="fas fa-chevron-down text-3xl"></i>
      </div>
    </section>
  );
};
