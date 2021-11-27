import reactRefresh from '@vitejs/plugin-react-refresh'
import inject from '@rollup/plugin-inject';

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [reactRefresh()],
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    }
  },
  build: {
      rollupOptions: {
          plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
      },
  },
}
