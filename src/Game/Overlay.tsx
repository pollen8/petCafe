import { PropsWithChildren } from "react";

export const Overlay = ({children}: PropsWithChildren) => {
    return (
        <div
        style={{
            position: "absolute",
            bottom: 0,

            left: 0,
            width: "100%",
            height: "30rem",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
        }}
        >
            {children}
        </div>
    );
}