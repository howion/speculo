import { type ReactElement } from 'react'

interface ConditionalWrapperProps {
    condition: boolean
    wrapper(children: ReactElement): ReactElement
    children: ReactElement
}

export function ConditionalWrapper(props: ConditionalWrapperProps): ReactElement {
    return props.condition ? props.wrapper(props.children) : props.children
}
