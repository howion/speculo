export function debounce(func: () => void, delay: number): () => void {
    let inDebounce: NodeJS.Timeout
    return () => {
        // const context = this
        // const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(func, delay)
    }
}
