import { Plugin } from 'vite';
import { readFileSync } from 'fs';
import { join } from 'path';

export function vitePlugin(): Plugin {
  return {
    name: 'vite-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/@vite/client')) {
          const clientPath = join(__dirname, 'vite-client.js');
          const clientCode = readFileSync(clientPath, 'utf-8');
          res.setHeader('Content-Type', 'application/javascript');
          res.end(clientCode);
          return;
        }
        next();
      });
    },
    transform(code, id) {
      if (id.includes('node_modules')) {
        return null;
      }

      // Add React Refresh runtime
      if (id.endsWith('.jsx') || id.endsWith('.tsx')) {
        const refreshCode = `
          import { createHotContext } from '/@vite/client';
          const hot = createHotContext('/${id}');
          if (import.meta.hot) {
            import.meta.hot.accept((mod) => {
              if (mod) {
                hot.accept();
              }
            });
          }
        `;
        return {
          code: refreshCode + code,
          map: null,
        };
      }
      return null;
    },
  };
}
