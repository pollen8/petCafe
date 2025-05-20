import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { patchCssModules } from 'vite-css-modules'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
        patchCssModules(), // ← This is all you need to add!
    react()],

    css: {
        // Your existing CSS Modules configuration
        modules: {
            // ...
        },
       
    },
    build: {
        // Recommended minimum target (See FAQ for more details)
        target: 'es2022'
    }
})
