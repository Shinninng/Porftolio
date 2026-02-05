import { useState } from 'react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Simulación de envío al backend (2 segundos)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría el envío real a tu backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setMessage({
        text: '¡Mensaje enviado con éxito!',
        type: 'success'
      });
      setFormData({ email: '', asunto: '', mensaje: '' });
    } catch (error) {
      setMessage({
        text: 'Error al enviar. Intenta de nuevo.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contacto"
      className="snap-section flex items-center justify-center px-6"
    >
      <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-black mb-6 uppercase italic">Contacto</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold mb-1">EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 border-none rounded focus:ring-2 ring-red-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">ASUNTO</label>
            <input
              type="text"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 border-none rounded focus:ring-2 ring-red-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">MENSAJE</label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 border-none rounded focus:ring-2 ring-red-500 outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-dark-blue text-white font-black py-4 rounded hover:bg-black transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <span>ENVIAR MENSAJE</span>
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
          </button>
          {message.text && (
            <p
              className={`text-center text-sm font-bold mt-2 ${
                message.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};
