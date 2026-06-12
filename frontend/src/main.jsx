import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import global design elements for consistency across the entire app
import './index.css'
import './styles/buttons.css'
import './styles/cards.css'
import './styles/containers.css'
import './styles/inputs.css'
import './styles/tables.css'


// Import the actual app itself
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
