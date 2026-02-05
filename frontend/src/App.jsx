import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import './index.css';

function App() {
  return (
    <div className="bg-custom-gray dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navigation />
      <main className="snap-container">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <FAQSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
