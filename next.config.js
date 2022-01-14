//const isProduction = process.env.NODE_ENV === 'production'

// Use Preact instead of React.
// const withPreact = require('next-plugin-preact')

// Transpile specific modules. Most nested.
const withTM = require('next-transpile-modules')(['auto-bind'])

// TODO: See: https://securityheaders.com/
module.exports = /*withPreact*/(
    withTM({
        webpack5: true,
        compress: true,
        trailingSlash: false,
        poweredByHeader: true,
        generateEtags: true,
        reactStrictMode: true,
        // future: {
        //     webpack5: false
        // },
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
)
