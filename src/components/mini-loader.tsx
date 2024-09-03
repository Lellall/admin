import { CSSProperties } from "react"
import { ColorRing } from "react-loader-spinner"

interface Props {
    style?: CSSProperties
}

function MiniLoader({ style }: Props) {
    return (
        <span
            style={{
                ...style,
            }}
        >
            <ColorRing
                height="25"
                width="25"
                ariaLabel="color-ring-loading"
                wrapperStyle={{ float: "center" }}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
        </span>
    )
}

export default MiniLoader
