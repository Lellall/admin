import { CSSProperties } from "react";
import { ColorRing } from "react-loader-spinner";

interface Props {
    style?: CSSProperties;
}

const ScreenLoader = ({ style }: Props) => {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100%",
                    ...style,
                }}
            >
                <ColorRing
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{ float: "center" }}
                    wrapperClass="color-ring-wrapper"
                    colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                />
            </div>
        </>
    );
};

export default ScreenLoader;
