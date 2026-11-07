import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Diagnostic from './pages/Diagnostic'
import About from './pages/About'
import Thinking from './pages/Thinking'
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
          {/* old links from before the redesign */}
          <Route path="/projects" element={<Navigate to="/services" replace />} />
          <Route path="/book" element={<Navigate to="/services" replace />} />
        </Routes>
      </main>
      <Footer />
      {import.meta.env.DEV && <DataToggle />}
    </div>
  )
}

export default App
