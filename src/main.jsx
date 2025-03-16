import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import App from './App.jsx'

const appClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={appClient}>
    <App />
    </QueryClientProvider>
  </StrictMode>
)
