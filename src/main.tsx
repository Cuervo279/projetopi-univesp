import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Navbar.tsx'
import Footer from './Footer.tsx'
import MainContent from './MainContent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <MainContent />
    <Footer />
  </StrictMode>,
)
