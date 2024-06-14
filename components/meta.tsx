import React, { type ReactElement } from 'react'
import Head from 'next/head'
import _ from 'lodash'
import { App } from '../constants/app'

export interface MetaProps {
    keywords?: text[]
    title?: text
    themeColor?: text
    author?: text
    description?: text
    _viewport?: boolean
    noindex?: boolean
}

export function Meta(props: MetaProps): ReactElement {
    const _keywords = props.keywords ? props.keywords : App.defaults.keywords

    return (
        <>
            <Head>
                <title>{props.title ? `${props.title} | ${App.name}` : App.name}</title>
                <meta
                    name="keywords"
                    content={_keywords.join(', ')}
                />
                <meta
                    name="author"
                    content={props.author || App.defaults.author}
                />
                <meta
                    name="theme-color"
                    content={props.themeColor || App.defaults.themeColor}
                />
                {props._viewport ?
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                    />
                :   null}
            </Head>
        </>
    )
}
