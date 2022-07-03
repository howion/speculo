export class MiscUtil {
    public static deg2rad(deg: number): number {
        return (deg * Math.PI) / 180
    }

    public static mod(m: number, n: number): number {
        return ((n % m) + m) % m
    }

    public static eulerToCssTransformation(yaw: number, pitch: number, roll: number): text {
        // note that the yaw angle retrieved is counter-clockwise!
        // pitch is perfectly functional
        // roll is perfectly functional for the upper half
        // yaw is quite ok

        yaw = 360 - yaw // make it clockwise
        if (yaw > 180) yaw = yaw - 360

        // return `rotateZ(${yaw}deg)`
        // return `rotateY(${roll}deg)`
        // return `rotateX(${90 - pitch}deg)`

        return `rotateZ(${yaw}deg) rotateX(${90 - pitch}deg) rotateY(${roll}deg)`
    }
}
