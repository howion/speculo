const fs = require('fs')
const PeerServer = require('peer').PeerServer

const server = PeerServer({
    port: 9000,
    ssl: {
        key: fs.readFileSync('./bin/certificates/localhost.key'),
        cert: fs.readFileSync('./bin/certificates/localhost.crt')
    }
})
