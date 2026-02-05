import { useState } from 'react';

export const FAQSection = () => {
  const [openItems, setOpenItems] = useState({});

  const faqItems = [
    {
      id: 1,
      question: '¿Qué software utilizas?',
      answer: 'Utilizo principalmente Unity, Unreal Engine 5 y para la documentación Miro y Notion.'
    },
    {
      id: 2,
      question: '¿Buscas colaboración en indies?',
      answer: 'Sí, estoy siempre abierto a proyectos que desafíen la narrativa tradicional.'
    },
    {
      id: 3,
      question: '¿Cuál es tu especialidad principal?',
      answer: 'Mi especialidad es el Game Design y la Narrativa Interactiva, con enfoque en crear experiencias únicas.'
    }
  ];

  const toggleFaq = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section
      id="faq"
      className="snap-section bg-gray-100 dark:bg-dark-bg flex flex-col items-center justify-center px-6"
    >
      <div className="max-w-2xl w-full">
        <h2 className="text-4xl font-black mb-8 text-center uppercase">FAQ</h2>
        <div className="space-y-4">
          {faqItems.map(item => (
            <div
              key={item.id}
              className={`faq-item bg-white dark:bg-dark-card p-4 rounded cursor-pointer border-l-4 border-dark-blue transition-all ${
                openItems[item.id] ? 'faq-active' : ''
              }`}
              onClick={() => toggleFaq(item.id)}
            >
              <div className="flex justify-between items-center font-bold">
                <span>{item.question}</span>
                <i className={`fas ${openItems[item.id] ? 'fa-minus' : 'fa-plus'}`}></i>
              </div>
              <div className={`faq-content text-sm mt-3 opacity-70 ${openItems[item.id] ? 'max-height-200' : ''}`}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-8 mt-16 text-3xl">
          <a href="#" className="hover:text-blue-500 transition">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </section>
  );
};
