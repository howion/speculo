// PACKAGES
import React, { type ReactElement } from 'react'
import { type AppProps } from 'next/app'

// COMPONENTS

// SCSS
import '/scss/main.scss'
import { Meta } from '../components/meta'

export default function App({ Component, pageProps, router }: AppProps): ReactElement {
    // const appRef = useRef<HTMLDivElement>(null)

    let route = router.route.split('/')[1].trim()
    if (!route) route = 'home'

    return (
        <>
            <Meta _viewport={true} />
            <div id="app" /*ref={appRef}*/>
                {/*<Modal/>*/}
                <div className={`speculo-${route}`}>
                    <Component {...pageProps} /*appRef={appRef}*/ />
                </div>
            </div>
        </>
    )
}
