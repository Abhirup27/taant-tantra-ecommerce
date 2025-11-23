import './index.css'

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'

// createRoot(document.getElementById('container')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

hydrateRoot(document.getElementById('container') as HTMLElement,

  <StrictMode>
    <App />
  </StrictMode>,
)
