import React, { ReactElement } from 'react'
import { MiscUtil } from '/utils/misc.util'

export interface CuboidProps {
    W: number
    H: number
    D: number

    x: number
    y: number
    z: number

    yaw: number // in radians
    roll: number
    pitch: number

    cubeColor?: text
    cubeOutline?: text
}

export function Cuboid(props: CuboidProps): ReactElement {
    console.log(`yaw: ${props.yaw}, roll: ${props.roll}, pitch: ${props.pitch}`)

    return (
        <div
            className="cuboid"
            style={{
                '--width': `${props.W}px`,
                '--height': `${props.H}px`,
                '--depth': `${props.D}px`,
                'transform': MiscUtil.eulerToCssTransformation(props.yaw, props.pitch, props.roll)
            } as any}
        >
            <div className="cuboid-s" />
            <div className="cuboid-s" />
            <div className="cuboid-s" />
            <div className="cuboid-s" />
            <div className="cuboid-s" />
            <div className="cuboid-s" />
        </div>
    )
}
