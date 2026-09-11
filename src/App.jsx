import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Diagnostic from './pages/Diagnostic'
import About from './pages/About'
import Projects from './pages/Projects'
import Thinking from './pages/Thinking'
import Book from './pages/Book'

function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary">
      <Nav />
      <main className="flex-1 pt-16">
        <div key={location.pathname} className="animate-page-in">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/diagnostic" element={<Diagnostic />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/thinking" element={<Thinking />} />
            <Route path="/book" element={<Book />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
