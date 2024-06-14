const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')

const app = next({ dev: true })
const handle = app.getRequestHandler()
const PORT = 3001

app.prepare().then(() => {
    createServer(
        {
            key: fs.readFileSync('./bin/certificates/localhost.key'),
            cert: fs.readFileSync('./bin/certificates/localhost.crt')
        },
        (req, res) => {
            const parsedUrl = parse(req.url, true)
            handle(req, res, parsedUrl)
        }
    ).listen(PORT, (err) => {
        if (err) throw err
        console.log(`> Server started on https://localhost:${PORT}`)
    })
})
