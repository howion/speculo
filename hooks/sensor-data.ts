export {}
// import { useState } from 'react'
//
// export type SensorData = [
//     number, // OrientationX
//     number, // OrientationY
//     number, // OrientationZ
//
//     number, // AccelerationX
//     number, // AccelerationY
//     number // AccelerationZ
// ]
//
// export type UseSensorsReturnType = [SensorData | null, () => void]
//
// const _orientation: [number, number, number] = [0, 0, 0]
// const _acceleration: [number, number, number] = [0, 0, 0]
//
// export function sensorData(): UseSensorsReturnType {
//     const [isEnabled, setIsEnabled] = useState(false)
//     const [hasSensors, setHasSensors] = useState(false)
//     const [orient, setOrient] = useState<[number, number, number]>([0, 0, 0])
//     const [acc, setAcc] = useState<[number, number, number]>([0, 0, 0])
//
//     // const { state } = usePermission({ name: '' })
//
//     function captureSensors() {
//         if (isEnabled) throw new Error('The hook useSensors is already enabled!')
//         setIsEnabled(true)
//
//         if (window.DeviceMotionEvent == undefined) {
//             alert('Can not read sensor (device orientation) data. Make sure it is a https connection.')
//             setHasSensors(false)
//             return
//         } else {
//             setHasSensors(true)
//         }
//
//         function handleDeviceOrientation(e: DeviceOrientationEvent): void {
//             if (e.alpha === null) {
//                 window.removeEventListener('deviceorientation', handleDeviceOrientation)
//                 setHasSensors(false)
//                 alert('Can not read sensor (device orientation) data. Make sure it is a https connection.')
//                 return
//             }
//
//             setOrient([e.alpha as number, e.beta as number, e.gamma as number])
//         }
//
//         function handleDeviceMotion(e: DeviceMotionEvent): void {
//             if (e.acceleration == undefined || e.acceleration.x === null) {
//                 window.removeEventListener('devicemotion', handleDeviceMotion)
//                 setHasSensors(false)
//                 alert('Can not read sensor (device motion) data. Make sure it is a https connection.')
//                 return
//             }
//
//             setAcc([e.acceleration.x as number, e.acceleration.y as number, e.acceleration.z as number])
//             // if (e.alpha === null) {
//             //     window.removeEventListener('deviceorientation', handleDeviceOrientation)
//             //     setHasSensors(false)
//             //     alert('Unable to read device orientation sensors!')
//             //     return
//             // }
//         }
//
//         window.addEventListener('deviceorientation', handleDeviceOrientation, true)
//         window.addEventListener('devicemotion', handleDeviceMotion, true)
//     }
//
//     const data = [orient[0], orient[1], orient[2], acc[0], acc[1], acc[2]] as SensorData
//     return [hasSensors ? data : null, captureSensors]
// }
