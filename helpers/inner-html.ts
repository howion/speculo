export function innerHtml(html = '') {
    return { dangerouslySetInnerHTML: { __html: html } }
}
