export function DEG2RAD(d: number): number {
    return d * Math.PI / 180

}
// export function computeTaitBryanTransformation(
//     yaw: number,
//     pitch: number,
//     roll: number
// ) {
//     const cy = Math.cos(yaw)
//     const sy = Math.sin(yaw)
    
//     const cp = Math.cos(pitch)
//     const sp = Math.sin(pitch)
    
//     const cr = Math.cos(roll)
//     const sr = Math.sin(roll)

//     return [
//         [cy * cr + sy * sp * sr, cy * sr - sy * sp * cr, sy * cp],
//         [sp * sr, cp * cr, -sy * sp],
//         [-sy * cr + cy * sp * sr, sy * sr + cy * sp * cr, cy * cp]
//     ]
// }

export function computeSpatialTransformationMatrix(
    x: number,
    y: number,
    z: number,
    alpha: number,
    beta: number,
    gamma: number,
) {
    alpha = DEG2RAD(alpha)
    beta = DEG2RAD(beta)
    gamma = DEG2RAD(gamma)

    const ca = Math.cos(alpha)
    const sa = Math.sin(alpha)

    const cb = Math.cos(beta)
    const sb = Math.sin(beta)
    
    const cg = Math.cos(gamma)
    const sg = Math.sin(gamma)

    return [
        cb * cg, -cb * sg, sb, x,
        ca * sg + sa * sb * cg, ca * cg - sa * sb * sg, -sa * cb, y,
        sa * sg - ca * sb * cg, sa * cg + ca * sb * sg, ca * cb, z,
        0, 0, 0, 1
    ]
}
