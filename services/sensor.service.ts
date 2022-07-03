import { Subject } from 'rxjs'
import { Service } from '/services/service'

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

        window.addEventListener('deviceorientation', (e: DeviceOrientationEvent) => {
            if (e.alpha === null) {
                SensorService.disable()
                alert('Can not read sensor (device orientation) data. Make sure it is a https connection.')
                return
            }

            window.addEventListener('deviceorientation', SensorService.handleDeviceOrientation, true)
        }, {once: true})

        // window.addEventListener('devicemotion', SensorService.handleDeviceMotion, true)
        SensorService._dispatchInterval = setInterval(SensorService._dispatch, frequency)

        SensorService._enabled = true
    }

    public static disable(): void {
        if (!SensorService._enabled) return
        window.removeEventListener('deviceorientation', SensorService.handleDeviceOrientation)
        // window.removeEventListener('devicemotion', SensorService.handleDeviceMotion)
        clearInterval(SensorService._dispatchInterval)
        SensorService._enabled = false
    }

    public static subscribe(callback: (obj: FinalOrientationData) => void): void {
        SensorService._subject.asObservable().subscribe(callback)
    }

    protected static _dispatch(): void {
        SensorService._subject.next(SensorService._ort)
    }

    protected static handleDeviceOrientation(e: DeviceOrientationEvent): void {

        // alpha: rotation around z-axis (0..360)
        const yaw = $$$(e.alpha!)

        // beta: rotation around x-axis (-180..+180) which will be normalized to (0..360)
        let pitch = $$$(e.beta!)

        // gamma: rotation around y-axis (0..180) where 90 is standard horizontal
        const roll = $$$(e.gamma!)

        if (pitch < 0) pitch = 360 + pitch

        SensorService._ort[0] = yaw   // >= 0
        SensorService._ort[1] = pitch // >= 0
        SensorService._ort[2] = roll  // >= 0

        SensorService._dispatch()
    }

    // protected static handleDeviceMotion(e: DeviceMotionEvent): void {
    //     if (e.acceleration === null || e.acceleration.x === null) {
    //         SensorService.disable()
    //         alert('Can not read sensor (device motion) data. Make sure it is a https connection.')
    //         return
    //     }

    //     SensorService._acc = [
    //         $(e.acceleration.x as number),
    //         $(e.acceleration.y as number),
    //         $(e.acceleration.z as number)
    //     ]
    // }
}
