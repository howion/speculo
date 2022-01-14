// PACKAGES
import React, { ReactElement } from 'react'
import { AppProps } from 'next/app'

// COMPONENTS
// import { Modal } from '/components/modal'
// import { Splash } from '/components/splash'
import { Meta } from '/components/meta'

// SCSS
import '/scss/main.scss'

export default function App({Component, pageProps, router}: AppProps): ReactElement {
    // const appRef = useRef<HTMLDivElement>(null)

    let route = router.route.split('/')[1].trim()
    if (!route) route = 'home'

    return (
        <>
            <Meta _viewport={true}/>
            <div id="app" /*ref={appRef}*/>
                {/*<Modal/>*/}
                <div className={`speculo-${route}`}>
                    <Component {...pageProps} /*appRef={appRef}*//>
                </div>
            </div>
        </>
    )
}
