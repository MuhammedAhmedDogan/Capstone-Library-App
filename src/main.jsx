import { createRoot } from 'react-dom/client';
import { StateProvider } from './context/StateContext.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StateProvider>
    <App />
  </StateProvider>
)
