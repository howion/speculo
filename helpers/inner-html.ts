/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function innerHtml(html = '') {
    return { dangerouslySetInnerHTML: { __html: html } }
}
