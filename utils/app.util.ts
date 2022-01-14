export class AppUtil {
    static readonly isClientSide: boolean = process.browser
    static readonly isNode: boolean = !AppUtil.isClientSide
}
