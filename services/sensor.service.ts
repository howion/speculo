import { Subject } from 'rxjs'
import { Service } from '/services/service'

export type SensorData = [
    number, // OrientationX
    number, // OrientationY
    number, // OrientationZ

    number, // AccelerationX
    number, // AccelerationY
    number // AccelerationZ
]

export class SensorService implements Service<SensorData> {
    protected static _subject = new Subject<SensorData>()
    protected static _enabled = false
    protected static _ort: [number, number, number] = [0, 0, 0]
    protected static _acc: [number, number, number] = [0, 0, 0]

    public static enable(): void {
        if (SensorService._enabled) return

        if (!window.DeviceMotionEvent) {
            alert('Can not read sensor (device orientation) data. Make sure it is a https connection.')
            return
        }

        window.addEventListener('deviceorientation', SensorService.handleDeviceOrientation, true)
        window.addEventListener('devicemotion', SensorService.handleDeviceMotion, true)

        SensorService._enabled = true
    }

    public static disable(): void {
        if (!SensorService._enabled) return
        window.removeEventListener('deviceorientation', SensorService.handleDeviceOrientation)
        window.removeEventListener('devicemotion', SensorService.handleDeviceMotion)
        SensorService._enabled = false
    }

    protected static _dispatch(): void {
        // setTimeout(() => {
        //     if (!this._enabled) return
        // })
        SensorService._subject.next([
            SensorService._ort[0],
            SensorService._ort[1],
            SensorService._ort[2],
            SensorService._acc[0],
            SensorService._acc[1],
            SensorService._acc[2]
        ])
    }

    protected static handleDeviceOrientation(e: DeviceOrientationEvent): void {
        if (e.alpha === null) {
            SensorService.disable()
            alert('Can not read sensor (device orientation) data. Make sure it is a https connection.')
            return
        }

        SensorService._ort = [e.alpha as number, e.beta as number, e.gamma as number]
        SensorService._dispatch()
    }

    protected static handleDeviceMotion(e: DeviceMotionEvent): void {
        if (e.acceleration === null || e.acceleration.x === null) {
            SensorService.disable()
            alert('Can not read sensor (device motion) data. Make sure it is a https connection.')
            return
        }

        SensorService._acc = [e.acceleration.x as number, e.acceleration.y as number, e.acceleration.z as number]
        SensorService._dispatch()
    }

    public static subscribe(callback: (obj: SensorData) => void): void {
        SensorService._subject.asObservable().subscribe(callback)
    }
}
