import React, { type ReactElement } from 'react'
import type { CuboidProps } from './cuboid'

export interface SceneProps {
    perspective: number
    children: ReactElement<CuboidProps>
}

export function Scene({ children, perspective }: SceneProps): ReactElement {
    return (
        <div
            className="scene"
            style={
                {
                    '--perspective': `${perspective}px`
                } as any
            }
        >
            {children}
        </div>
    )
}
