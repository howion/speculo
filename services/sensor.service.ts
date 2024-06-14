import { Subject } from 'rxjs'
import type { Service } from './service'

export type FinalOrientationData = Int16Array // [yaw, roll, pitch]

function $$$(n: number): number {
    return Math.trunc(n * 10) / 10
}

export class SensorService implements Service<FinalOrientationData> {
    protected static _subject = new Subject<FinalOrientationData>()
    protected static _enabled = false

    protected static _ort: Int16Array = new Int16Array(3)
    // protected static _acc: [number, number, number] = [0, 0, 0]
    // protected static _last_ort_xor = 0

    protected static _dispatchInterval: NodeJS.Timer

    public static enable(frequency = 100): void {
        if (SensorService._enabled) return

        if (!window.DeviceMotionEvent) {
            alert('Can not read sensor (device orientation) data. Make sure it is a https connection.')
            return
        }

        window.addEventListener(
            'deviceorientation',
            (e: DeviceOrientationEvent) => {
                if (e.alpha === null) {
                    SensorService.disable()
                    alert('Can not read sensor (device orientation) data. Make sure it is a https connection.')
                    return
                }

                window.addEventListener('deviceorientation', SensorService.handleDeviceOrientation, true)
            },
            { once: true }
        )

        // window.addEventListener('devicemotion', SensorService.handleDeviceMotion, true)
        SensorService._dispatchInterval = setInterval(SensorService._dispatch, frequency)

        SensorService._enabled = true
    }

    public static disable(): void {
        if (!SensorService._enabled) return
        window.removeEventListener('deviceorientation', SensorService.handleDeviceOrientation)
        // window.removeEventListener('devicemotion', SensorService.handleDeviceMotion)
        clearInterval(SensorService._dispatchInterval as any)
        SensorService._enabled = false
    }

    public static subscribe(callback: (obj: FinalOrientationData) => void): void {
        SensorService._subject.asObservable().subscribe(callback)
    }

    protected static _dispatch(): void {
        SensorService._subject.next(SensorService._ort)
    }

    protected static handleDeviceOrientation(e: DeviceOrientationEvent): void {
        const A = $$$(e.alpha!)
        const G = $$$(e.gamma!)
        const B = $$$(e.beta!)

        // if (pitch < 0) pitch = 360 + pitch

        SensorService._ort[0] = A // >= 0
        SensorService._ort[1] = G // >= 0
        SensorService._ort[2] = B // >= 0

        SensorService._dispatch()
    }

    // protected static handleDeviceMotion(e: DeviceMotionEvent): void {
    // }
}
