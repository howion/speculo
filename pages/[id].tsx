import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { Meta } from '/components/meta'
import { useDidMount } from 'rooks'
import { Scene } from '/components/cuboid/scene'
import { Cuboid } from '/components/cuboid/cuboid'
import { SensorData, SensorService } from '/services/sensor.service'

// import ContentLoader from 'react-content-loader'
// const x = dynamic(
// //     () => import('@react-three/fiber'),
// //     { ssr: false }
// // )
// //
// // console.log(x)

// import function SafeHydrate({ children }) {
//     return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>
// }

export type SpatialData = [
    number, // X
    number, // Y
    number, // Z

    number, // Rx ie alpha
    number, // Ry ie beta
    number // Rz ie gamma
]

export type ConnectionStatus = 'idle' | 'open' | 'closed' | 'connected' | 'disconnected'

interface HostScreenProps {
    connStatus: ConnectionStatus
    share: text | null
    data: SpatialData
}

function HostScreen({ connStatus, share, data }: HostScreenProps): ReactElement {
    if (connStatus === 'connected') {
        return (
            <Scene perspective={500}>
                <Cuboid
                    W={500}
                    H={10}
                    D={100}
                    x={data[0]}
                    y={data[1]}
                    z={data[2]}
                    unit="deg"
                    Rx={data[3]}
                    Ry={data[4]}
                    Rz={data[5]}
                />
            </Scene>
        )
    }

    if (connStatus === 'closed' || connStatus === 'disconnected') {
        return (
            <div className="speculo-home-welcome">
                <p>Disconnected!</p>
            </div>
        )
    }

    return (
        <div className="speculo-home-welcome">
            {share ? (
                <p>
                    Open this link in your mobile device: <a href={share}>{share}</a> and keep this tab open.
                </p>
            ) : (
                <p>Creating a host peer...</p>
            )}
        </div>
    )
}

interface ClientScreenProps {
    connStatus: ConnectionStatus
}

function ClientScreen({ connStatus }: ClientScreenProps): ReactElement {
    if (connStatus !== 'idle' && connStatus !== 'open') {
        return (
            <div className="speculo-home-welcome">
                {connStatus === 'connected' ? <p>Connected!</p> : null}
                {connStatus === 'closed' || connStatus === 'disconnected' ? <p>Disconnected!</p> : null}
            </div>
        )
    }

    return (
        <div className="speculo-home-welcome">
            <p>Connecting to the host...</p>
        </div>
    )
}

export default function Room(): ReactElement {
    const router = useRouter()
    const isHost = router.pathname === '/'

    const [connStatus, setConnStatus] = useState<ConnectionStatus>('idle')
    const [share, setShare] = useState<text | null>(null)
    const [data, setData] = useState<SpatialData>([0, 0, 0, 0, 0, 0])

    console.log('connStatus: ' + connStatus)

    useDidMount(() => {
        import('peerjs').then((m) => {
            const Peer = m.default

            if (isHost) {
                const host = new Peer()

                host.on('open', (id) => {
                    setShare(window.location.href + id)
                    setConnStatus('open')
                })

                host.on('connection', (conn) => {
                    console.log('WE HAVE INCOMING CONN')
                    console.log('is open: ' + conn.open)
                    console.log(conn)

                    if (connStatus === 'connected') {
                        console.log('closed due to existing conn.')
                        // We already have a connection.
                        conn.close()
                        return
                    }


                    conn.on('open', () => {
                        console.log('WE DID CONNECT!')
                        setConnStatus('connected')
                    })
                    conn.on('data', (data: SensorData) => {
                        setData(data)
                        console.log(data)
                    })
                    conn.on('close', () => setConnStatus('closed'))
                    conn.on('error', (err) => alert(err))
                })

                host.on('close', () => setConnStatus('closed'))
                host.on('error', (err) => alert(err))
            } else {
                SensorService.enable()

                const id = window.location.pathname.split('/')[1]
                const client = new Peer()

                client.on('open', () => {
                    setConnStatus('open')

                    console.log(client)

                    const conn = client.connect(id /*, { reliable: true }*/)

                    console.log(conn)

                    conn.on('open', () => {
                        console.log('CONNECTION IS NOW OPEN')

                        setConnStatus('connected')
                        // SensorService.subscribe((data) => conn.send(data))
                        conn.send([0, 0, 0, 0, 0, 31])
                    })
                    conn.on('close', () => setConnStatus('closed'))
                    conn.on('error', (err) => alert(err))
                })
                // client.on('connection', function (c) {
                //     // Disallow incoming connections
                //     c.on('open', function () {
                //         c.send('Sender does not accept incoming connections')
                //         setTimeout(function () {
                //             c.close()
                //         }, 500)
                //     })
                // })
                client.on('close', () => setConnStatus('closed'))
                client.on('disconnected', () => setConnStatus('disconnected'))
                client.on('error', (err) => alert(err))
            }
        })
    })

    return (
        <>
            <Meta />
            <main className="speculo-home-main">
                {isHost ? (
                    <HostScreen connStatus={connStatus} data={data} share={share} />
                ) : (
                    <ClientScreen connStatus={connStatus} />
                )}
            </main>
        </>
    )
}
