// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // Set the site URL for production
  site: 'https://bitdoze.com',
  
  // Base path (set to '/' for most sites)
  base: '/',
  
  // Configure the build output
  output: 'static',
  
  // Configure Vite plugins
  vite: {
    plugins: [
      tailwindcss() 
    ]
  },
  
  // Configure Astro integrations
  integrations: [mdx(), icon()]
});