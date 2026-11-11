import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import HomePage from './client/pages/HomePage.tsx'
import ComparePrice from './client/pages/ComparePrice.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/compare/:id" element={<ComparePrice />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
