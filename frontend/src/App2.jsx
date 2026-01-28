/**
 * App2.jsx - Versión alternativa del portfolio con diseño de Game Designer
 * 
 * Uso:
 * - Renombra tu App.jsx a AppModerno.jsx
 * - Renombra este archivo a App.jsx
 * - O importa en tu index.jsx: import App from './App2'
 */

import PortfolioGame from './components/PortfolioGame';
import { useScrollSnap } from './hooks/useScrollSnap';

function App2() {
  // Activa el hook de scroll snap para funcionalidad adicional
  useScrollSnap();

  return <PortfolioGame />;
}

export default App2;
