const isProduction = process.env.NODE_ENV === 'production'
const PRODUCTION_BASE = 'https://speculo.vercel.app'

export const App = {
    name: 'Speculo',
    baseUrl: isProduction ? PRODUCTION_BASE : 'http://localhost:3000',
    isProduction,
    version: '0.0.1',
    defaults: {
        description: '',
        author: 'howion',
        keywords: ['P2P', 'WebRTC'],
        themeColor: '#000000'
    }
    // api: {
    //     baseUrl: isProduction ? `${PRODUCTION_BASE}/api` : 'http://localhost:3000/api'
    // }
} as const
