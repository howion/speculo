// Transpile specific modules. Most nested.
const withTM = require('next-transpile-modules')(['auto-bind'])

module.exports = withTM({
    webpack5: true,
    compress: true,
    trailingSlash: false,
    poweredByHeader: true,
    generateEtags: true,
    reactStrictMode: true,
    async redirects() {
        return [
            // {
            //     source: '/home',
            //     destination: '/',
            //     permanent: true
            // }
        ]
    }
})
