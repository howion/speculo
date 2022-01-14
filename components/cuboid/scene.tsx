import React, { ReactElement } from 'react'
import { CuboidProps } from '/components/cuboid/cuboid'

export interface SceneProps {
    perspective: number
    children: ReactElement<CuboidProps>
}

export function Scene({children, perspective}: SceneProps): ReactElement {
    return <div className="scene" style={{
        '--perspective': `${perspective}px`
    } as any}>{children}</div>
}
