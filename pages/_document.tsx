import React, { type ReactElement } from 'react'
import Document, { Html, Head, Main, NextScript, type DocumentInitialProps, type DocumentContext } from 'next/document'

/*
 * [TODO:]
 * ADD MANIFEST
 * ADD SPLASH
 * ADD THEME COLOR
 * ADD APPLE-TOUCH ICON
 * ADD MASKABLE ICON
 * ADD META
 * REDIRECT HTTP TO HTTPS
 */

/* eslint max-len: 0 */
export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render(): ReactElement {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta
                        name="referrer"
                        content="origin"
                    />
                    <link
                        rel="icon"
                        href="/favicon.ico"
                    />
                </Head>
                <body style={{ backgroundColor: '#000' }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
