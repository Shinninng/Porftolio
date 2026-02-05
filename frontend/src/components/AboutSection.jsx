export const AboutSection = () => {
  const skills = [
    { name: 'GAME DESIGN', percentage: 95 },
    { name: 'PROGRAMACIÓN', percentage: 75 }
  ];

  return (
    <section
      id="sobre-mi"
      className="snap-section bg-gray-200 dark:bg-dark-card flex items-center justify-center px-6"
    >
      <div className="max-w-4xl text-center md:text-right">
        <h2 className="text-5xl font-black mb-6 italic uppercase">Sobre Mi</h2>
        <p className="text-xl leading-relaxed opacity-80">
          Me especializo en las disciplinas de Game Design, Systems Design y Narrativa Interactiva. Mi enfoque principal reside en la creación de experiencias de juego que posean una identidad distintiva.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {skills.map(skill => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span>{skill.name}</span>
                <span>{skill.percentage}%</span>
              </div>
              <div className="skill-bar">
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
  );
};
