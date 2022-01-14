import { waitForWithPromise } from '/helpers/wait-for'

export class ClientUtil {
    static async waitForDocumentReady(): Promise<void> {
        await waitForWithPromise(() => document.readyState === 'complete')
    }

    static redirect(path: text /*, useRouter = false*/): void {
        location.replace(path)
    }

    static freezeDocumentScroll(): void {
        const winScroll = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top = `-${winScroll}px`
    }

    static releaseDocumentScroll(): void {
        const recordScroll = parseInt(document.body.style.top || '0')
        document.body.style.position = ''
        document.body.style.top = ''
        window.scrollTo(0, recordScroll * -1)
    }
}
