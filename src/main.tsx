import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// `page.css` applies the Spectrum 2 background color + color scheme to <html>
// for a full-page app. The <Provider> (in App) supplies fonts, locale, etc.
import '@react-spectrum/s2/page.css';
import './index.css';

import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
