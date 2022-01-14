export const WEBRTC_CONFIG = {
    iceServers: [
        { urls: ['stun:eu-turn3.xirsys.com'] },
        {
            username: 'GYvh9uZEjdlaJZ9oNlsF7d8aI4uV6Oz7OqvfrcjpqlBEbNSLO4zchg1sREtnWH9hAAAAAGHh019ob3dpb24=',
            credential: 'd6fa397e-7572-11ec-9a8c-0242ac140004',
            urls: [
                'turn:eu-turn3.xirsys.com:80?transport=udp',
                'turn:eu-turn3.xirsys.com:3478?transport=udp',
                'turn:eu-turn3.xirsys.com:80?transport=tcp',
                'turn:eu-turn3.xirsys.com:3478?transport=tcp',
                'turns:eu-turn3.xirsys.com:443?transport=tcp',
                'turns:eu-turn3.xirsys.com:5349?transport=tcp'
            ]
        }
    ]

    // iceServers: [
    //     { urls: 'stun:stun01.sipphone.com' },
    //     { urls: 'stun:stun.ekiga.net' },
    //     { urls: 'stun:stun.fwdnet.net' },
    //     { urls: 'stun:stun.ideasip.com' },
    //     { urls: 'stun:stun.iptel.org' },
    //     { urls: 'stun:stun.rixtelecom.se' },
    //     { urls: 'stun:stun.schlund.de' },
    //     { urls: 'stun:stun.l.google.com:19302' },
    //     { urls: 'stun:stun1.l.google.com:19302' },
    //     { urls: 'stun:stun2.l.google.com:19302' },
    //     { urls: 'stun:stun3.l.google.com:19302' },
    //     { urls: 'stun:stun4.l.google.com:19302' },
    //     { urls: 'stun:stunserver.org' },
    //     { urls: 'stun:stun.softjoys.com' },
    //     { urls: 'stun:stun.voiparound.com' },
    //     { urls: 'stun:stun.voipbuster.com' },
    //     { urls: 'stun:stun.voipstunt.com' },
    //     { urls: 'stun:stun.voxgratia.org' },
    //     { urls: 'stun:stun.xten.com' },
    //     {
    //         urls: 'turn:numb.viagenie.ca',
    //         credential: 'muazkh',
    //         username: 'webrtc@live.com'
    //     },
    //     {
    //         urls: 'turn:192.158.29.39:3478?transport=udp',
    //         credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
    //         username: '28224511:1379330808'
    //     },
    //     {
    //         urls: 'turn:192.158.29.39:3478?transport=tcp',
    //         credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
    //         username: '28224511:1379330808'
    //     }
    // ]
}
