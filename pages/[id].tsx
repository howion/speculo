import type Peer from 'peerjs'
import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { Meta } from '/components/meta'
import { useDidMount } from 'rooks'
import { Scene } from '/components/cuboid/scene'
import { Cuboid } from '/components/cuboid/cuboid'
import { FinalOrientationData, SensorService } from '/services/sensor.service'
import { WEBRTC_CONFIG } from '/constants/webrtc'

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

    number, // alpha
    number, // gamma
    number // beta
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
                    W={200}
                    H={400}
                    D={40}
                    x={data[0]}
                    y={data[1]}
                    z={data[2]}
                    yaw={data[3]}
                    pitch={data[4]}
                    roll={data[5]}
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

    const PeerConf: Peer.PeerJSOption = {
        // host: '144.122.116.84',
        // port: 9000,
        // path: '/',
        // secure: true,
        config: WEBRTC_CONFIG,
        // debug: 2
    }

    useDidMount(() =>
        import('peerjs').then((m) => {
            const Peer = m.default

            if (isHost) {
                const host = new Peer(PeerConf)
                let lastConnection: Peer.DataConnection | null = null

                host.on('open', (id) => {
                    setShare(window.location.href + id)
                    setConnStatus('open')
                })

                host.on('connection', (conn) => {
                    if (lastConnection && lastConnection.open) {
                        lastConnection.close()
                    } else {
                        lastConnection = conn
                    }

                    conn.on('open', () => setConnStatus('connected'))
                    conn.on('data', (data: any) => {
                        setData([
                            0, 0, 0,
                            data[0],
                            data[1],
                            data[2]
                        ])
                    })
                    conn.on('close', () => setConnStatus('closed'))
                    conn.on('error', (err) => alert(err))
                })

                host.on('close', () => setConnStatus('closed'))
                host.on('error', (err) => alert(err))
            } else {
                SensorService.enable()

                const id = window.location.pathname.split('/')[1]
                const client = new Peer(PeerConf)

                client.on('open', () => {
                    setConnStatus('open')

                    const conn = client.connect(id, {
                        reliable: false
                    })

                    setInterval(() => {
                        console.log('is open: ' + conn.open)
                    }, 2000)

                    conn.on('open', () => {
                        setConnStatus('connected')
                        SensorService.subscribe((data) => {
                            if (!conn.open) return
                            conn.send([data[0], data[1], data[2]])
                        })
                    })
                    conn.on('close', () => setConnStatus('closed'))
                    conn.on('error', (err) => alert(err))
                })
                client.on('connection', function (c) {
                    // Disallow incoming connections
                    c.on('open', function () {
                        c.send('Sender does not accept incoming connections')
                        setTimeout(function () {
                            c.close()
                        }, 500)
                    })
                })
                client.on('close', () => setConnStatus('closed'))
                client.on('disconnected', () => setConnStatus('disconnected'))
                client.on('error', (err) => alert(err))
            }
        })
    )

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
