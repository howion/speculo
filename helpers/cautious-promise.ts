export async function cautiousPromise<T>(promise: Promise<T>): Promise<[T | null, any?]> {
    return promise.then((data) => [data] as [T]).catch((e) => [null, e])
}
