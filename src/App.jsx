import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Diagnostic from './pages/Diagnostic'
import About from './pages/About'
import Projects from './pages/Projects'
import Thinking from './pages/Thinking'
import Book from './pages/Book'
import Services from './pages/Services'
import DataToggle from './dev/DataToggle'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-primary">
      <ScrollToTop />
      <Nav />
      <main className="flex-1 pt-16 print:pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/insights" element={<Thinking />} />
          <Route path="/thinking" element={<Navigate to="/insights" replace />} />
          {/* old pages, kept reachable until Services absorbs them */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </main>
      <Footer />
      {import.meta.env.DEV && <DataToggle />}
    </div>
  )
}

export default App
