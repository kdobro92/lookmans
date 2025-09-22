import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/naver': {https://blog.naver.com/edgerok
          target: 'https://openapi.naver.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/naver/, '/v1/search/blog.json'),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              // 네이버 API 헤더 추가
              const clientId = env.VITE_NAVER_API_CLIENT_ID;
              const clientSecret = env.VITE_NAVER_API_CLIENT_SECRET;
              
              console.log('🔑 프록시에서 API 키 설정:', {
                clientId: clientId ? `${clientId.substring(0, 8)}...` : '없음',
                clientSecret: clientSecret ? `${clientSecret.substring(0, 8)}...` : '없음'
              });
              
              if (clientId && clientSecret) {
                proxyReq.setHeader('X-Naver-Client-Id', clientId);
                proxyReq.setHeader('X-Naver-Client-Secret', clientSecret);
              } else {
                console.error('❌ API 키가 설정되지 않았습니다!');
              }
            });
          }
        }
      }
    }
  }
})
