import React, {ReactElement} from 'react'

export interface CuboidProps {

    W: number
    H: number
    D: number

    x: number
    y: number
    z: number

    unit?: 'deg' | 'rad' | 'grad' | 'turn'

    Rx: number // in radians
    Ry: number
    Rz: number

    cubeColor?: text
    cubeOutline?: text
}

export function Cuboid(props: CuboidProps): ReactElement {
    const unit = props.unit ?? 'rad'

    return (
        <div className="cuboid" style={{
            '--width': `${props.W}px`,
            '--height': `${props.H}px`,
            '--depth': `${props.D}px`,
            transform: `rotateX(${props.Rx}${unit}) rotateY(${props.Ry}${unit}) rotateZ(${props.Rz}${unit})`
        } as any}>
            <div className="cuboid-s"/>
            <div className="cuboid-s"/>
            <div className="cuboid-s"/>
            <div className="cuboid-s"/>
            <div className="cuboid-s"/>
            <div className="cuboid-s"/>
        </div>
    )
}
