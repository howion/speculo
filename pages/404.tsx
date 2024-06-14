import React, { type ReactElement } from 'react'
import { Meta } from '../components/meta'

// TODO:
export default function _404(): ReactElement {
    return (
        <>
            <Meta
                title="404"
                noindex={true}
            />
            <div className="speculo-404-figure-container">
                <h1 className="speculo-404-figure">404</h1>
            </div>
        </>
    )
}
