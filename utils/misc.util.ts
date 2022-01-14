import Quaternion from 'quaternion'

export class MiscUtil {
    public static deg2rad(deg: number): number {
        return (deg * Math.PI) / 180
    }

    public static mod(m: number, n: number): number {
        return ((n % m) + m) % m
    }

    public static eulerToCssTransformation(alpha: number, beta: number, gamma: number): text {
        // const betaRad = MiscUtil.deg2rad(beta)
        //
        // const gammaY = -Math.sin(betaRad)
        // const gammaZ = Math.cos(betaRad)
        //
        // return `rotate3d(0,1,0,${alpha}deg) rotate3d(-1,0,0,${beta}deg) rotate3d(0,${gammaY},${gammaZ},${gamma}deg)`

        const rad = Math.PI / 180
        const q = Quaternion.fromEuler(rad * alpha, rad * beta, rad * gamma, 'ZXY')
        return `matrix3d(${q.conjugate().toMatrix4()})`
    }
}
