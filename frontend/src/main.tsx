import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { PitchProvider } from './contexts/PitchContext.tsx';
createRoot(document.getElementById('root')!).render(
  <PitchProvider>
  <App />
</PitchProvider>,
)
