import { useEffect, useState } from "react"
import { ViewportWidth } from "../utils/enums"

type ViewportValue =
    | string
    | boolean
    | number
    | undefined
    | React.CSSProperties
    | null

type ResponsiveValueOptions = {
    sm: ViewportValue
    md?: ViewportValue
    lg?: ViewportValue
    xl?: ViewportValue
}

export function useResponsiveValue(opts: ResponsiveValueOptions) {
    const [responsiveValue, setResponsiveVaue] = useState<
        ViewportValue | undefined
    >(() => getRespValue(opts, window.innerWidth))

    useEffect(() => {
        const handleViewChange = () => {
            const currResponsiveValue = getRespValue(opts, window.innerWidth)
            setResponsiveVaue(currResponsiveValue)
        }

        window.addEventListener("resize", handleViewChange)
        return () => window.removeEventListener("resize", handleViewChange)
    }, [opts])

    return responsiveValue
}

const getRespValue = (opts: ResponsiveValueOptions, respWidth: number) => {
    if (respWidth <= ViewportWidth.sm) {
        return opts.sm
    }
    if (respWidth <= ViewportWidth.lg) {
        return opts.md ?? opts.sm
    }
    return opts.lg ?? opts.md ?? opts.sm
}
