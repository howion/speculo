import { Subject } from 'rxjs'
import { Service } from '/services/service'
import { debounce } from '/helpers/debounce'

export type SensorData = [
    number, // OrientationX
    number, // OrientationY
    number, // OrientationZ

    number, // AccelerationX
    number, // AccelerationY
    number // AccelerationZ
]

function $(n: number): number {
    if (n === 0) return 0
    return Math.round(n * 100) / 100
}

export class SensorService implements Service<SensorData> {
    protected static _subject = new Subject<SensorData>()
    protected static _enabled = false

    protected static _ort: [number, number, number] = [0, 0, 0]
    protected static _acc: [number, number, number] = [0, 0, 0]
    protected static _last: SensorData = [0, 0, 0, 0, 0, 0]

    protected static _dispatchInterval: NodeJS.Timer

    public static enable(frequency = 100): void {
        if (SensorService._enabled) return

        if (!window.DeviceMotionEvent) {
            alert('Can not read sensor (device orientation) data. Make sure it is a https connection.')
            return
        }

        window.addEventListener('deviceorientation', SensorService.handleDeviceOrientation, true)
        window.addEventListener('devicemotion', SensorService.handleDeviceMotion, true)
        SensorService._dispatchInterval = setInterval(SensorService._dispatch, frequency)

        SensorService._enabled = true
    }

    public static disable(): void {
        if (!SensorService._enabled) return
        window.removeEventListener('deviceorientation', SensorService.handleDeviceOrientation)
        window.removeEventListener('devicemotion', SensorService.handleDeviceMotion)
        clearInterval(SensorService._dispatchInterval)
        SensorService._enabled = false
    }

    public static subscribe(callback: (obj: SensorData) => void): void {
        SensorService._subject.asObservable().subscribe(callback)
    }

    protected static _dispatch(): void {
        // setTimeout(() => {
        //     if (!this._enabled) return
        // })
        const _new: SensorData = [
            SensorService._ort[0],
            SensorService._ort[1],
            SensorService._ort[2],
            SensorService._acc[0],
            SensorService._acc[1],
            SensorService._acc[2]
        ]

        if (
            SensorService._last[0] === _new[0] &&
            SensorService._last[1] === _new[1] &&
            SensorService._last[2] === _new[2] &&
            SensorService._last[3] === _new[3] &&
            SensorService._last[4] === _new[4] &&
            SensorService._last[5] === _new[5]
        )
            return

        SensorService._subject.next((SensorService._last = _new))
    }

    protected static handleDeviceOrientation(e: DeviceOrientationEvent): void {
        if (e.alpha === null) {
            SensorService.disable()
            alert('Can not read sensor (device orientation) data. Make sure it is a https connection.')
            return
        }

        SensorService._ort = [$(e.alpha as number), $(e.beta as number), $(e.gamma as number)]
    }

    protected static handleDeviceMotion(e: DeviceMotionEvent): void {
        if (e.acceleration === null || e.acceleration.x === null) {
            SensorService.disable()
            alert('Can not read sensor (device motion) data. Make sure it is a https connection.')
            return
        }

        SensorService._acc = [
            $(e.acceleration.x as number),
            $(e.acceleration.y as number),
            $(e.acceleration.z as number)
        ]
    }
}
