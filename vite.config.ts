import { defineConfig } from 'vite';
import macros from 'unplugin-parcel-macros';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// macros.vite() MUST run before the React plugin so the Spectrum 2 `style`
// macro is evaluated at build time.
export default defineConfig({
  plugins: [macros.vite(), react(), tailwindcss()],
});
