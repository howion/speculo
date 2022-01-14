import React, { ReactElement } from 'react'
import { MiscUtil } from '/utils/misc.util'

export interface CuboidProps {
    W: number
    H: number
    D: number

    x: number
    y: number
    z: number

    alpha: number // in radians
    beta: number
    gamma: number

    cubeColor?: text
    cubeOutline?: text
}

export function Cuboid(props: CuboidProps): ReactElement {
    return (
        <div
            className="cuboid"
            style={
                {
                    '--width': `${props.W}px`,
                    '--height': `${props.H}px`,
                    '--depth': `${props.D}px`,
                    'transform': MiscUtil.eulerToCssTransformation(props.alpha, props.beta, props.gamma)
                } as any
            }
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
