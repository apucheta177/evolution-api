import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Build config used only to produce a single self-contained HTML file
// (for hosting the app as a shareable static page, e.g. Claude Artifacts).
// Normal development/build should keep using vite.config.ts.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-artifact',
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
  },
})
