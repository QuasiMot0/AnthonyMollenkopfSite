import { Header, Hero, About, Contact } from './components/Sections.jsx';
import Projects from './components/Projects.jsx';
import Interests from './components/Interests.jsx';
import CursorTracker from './components/CursorTracker.jsx';
import ScrollCube from './components/ScrollCube.jsx';

export default function App() {
  return (
    <div className="page">
      <Header />
      <ScrollCube />
      <main>
        <Hero />
        <div className="rule" />
        <About />
        <Projects />
        <Interests />
        <Contact />
      </main>
      <CursorTracker />
    </div>
  );
}
