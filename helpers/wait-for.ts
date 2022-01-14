export function waitFor(
    condition: () => boolean,
    callback: () => void,
    frequency = 100
): void {
    if (!condition()) {
        window.setTimeout(
            () => waitFor(condition, callback, frequency),
            frequency
        )
    } else {
        callback()
    }
}

export function waitForWithPromise(
    condition: () => boolean,
    frequency = 100
): Promise<void> {
    return new Promise<void>((resolve) => {
        waitFor(condition, resolve, frequency)
    })
}
