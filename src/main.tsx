import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign browser ResizeObserver loop undelivered notifications and iframe WebSocket rejections
window.addEventListener('error', (event) => {
  const msg = event?.message || '';
  if (
    typeof msg === 'string' &&
    (msg.includes('ResizeObserver loop completed with undelivered notifications') ||
      msg.includes('ResizeObserver loop limit exceeded') ||
      msg.includes('WebSocket'))
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = event?.reason;
  const msg = reason?.message || String(reason || '');
  if (
    typeof msg === 'string' &&
    (msg.includes('WebSocket') ||
      msg.includes('WebSocket closed without opened') ||
      msg.includes('ResizeObserver'))
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
