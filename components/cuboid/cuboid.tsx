import { transform } from 'lodash'
import React, { type ReactElement } from 'react'
import { computeSpatialTransformationMatrix } from '../../utils/transformation.util'

export interface CuboidProps {
    W: number
    H: number
    D: number

    x: number
    y: number
    z: number

    A: number // in radians
    B: number
    G: number

    cubeColor?: text
    cubeOutline?: text
}

export function Cuboid(props: CuboidProps): ReactElement {
    const { A, G, B } = props
    console.log(`Alpha: ${A}, Gamma: ${G}, Beta: ${B}`)

    const transformation = computeSpatialTransformationMatrix(0, 0, 0, B, 360 - A, G).flat()

    return (
        <div
            className="cuboid"
            style={{
                '--width': `${props.W}px`,
                '--height': `${props.H}px`,
                '--depth': `${props.D}px`,
                transform: `matrix3d(${transformation.join(',')})`
            } as React.CSSProperties}
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
