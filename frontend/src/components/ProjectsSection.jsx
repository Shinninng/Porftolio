export const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: 'PROYECTO ALPHA',
      image: 'https://via.placeholder.com/400x250',
      tags: ['UNITY', 'C#']
    },
    {
      id: 2,
      title: 'PROYECTO BETA',
      image: 'https://via.placeholder.com/400x250',
      tags: ['UNREAL', 'BLUEPRINTS']
    },
    {
      id: 3,
      title: 'PROYECTO GAMMA',
      image: 'https://via.placeholder.com/400x250',
      tags: ['GODOT', 'GDScript']
    }
  ];

  return (
    <section
      id="proyectos"
      className="snap-section flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <h2 className="text-4xl font-black mb-10 uppercase tracking-widest">
        Galería Proyectos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-white dark:bg-dark-card p-4 shadow-xl border-b-4 border-red-600 group"
          >
            <div className="h-40 bg-gray-300 mb-4 overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <h3 className="font-black text-xl">{project.title}</h3>
            <div className="flex gap-2 my-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] bg-dark-blue text-white px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <a href="#" className="text-sm font-bold border-b-2 border-black dark:border-white">
                VER MÁS
              </a>
              <div className="flex gap-3">
                <i className="fab fa-github cursor-pointer hover:text-blue-500 transition"></i>
                <i className="fas fa-external-link-alt cursor-pointer hover:text-blue-500 transition"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
