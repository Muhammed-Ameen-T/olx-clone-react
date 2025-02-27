import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ItemViewPage from './ItemView.tsx'
import ItemSellingSellItemPage from './ItemSelling.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ItemViewPage />
    <ItemSellingSellItemPage/>
  </StrictMode>,
)
