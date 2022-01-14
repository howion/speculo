const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = 3001

const httpsOptions = {
    key: fs.readFileSync('./bin/certificates/localhost.key'),
    cert: fs.readFileSync('./bin/certificates/localhost.crt')
}
app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(PORT, (err) => {
        if (err) throw err
        console.log(`> Server started on https://localhost:${PORT}`)
    })
})
