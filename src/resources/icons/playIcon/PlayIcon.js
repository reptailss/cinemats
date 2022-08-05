import * as React from "react"

const PlayIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style={{
            enableBackground: "new 0 0 512 512",
        }}
        xmlSpace="preserve"
        {...props}
    >
        <path
            style={{
                fill: "#db2b42",
            }}
            d="M460.8 68.452H51.2c-28.16 0-51.2 23.04-51.2 51.2v272.696c0 28.16 23.04 51.2 51.2 51.2h409.6c28.16 0 51.2-23.04 51.2-51.2V119.652c0-28.16-23.04-51.2-51.2-51.2zM188.44 359.98V151.108l195.624 104.44L188.44 359.98z"
        />
        <path
            style={{
                fill: "#fff",
            }}
            d="m188.44 359.98 195.616-104.432-195.616-104.44z"
        />
    </svg>
)

export default PlayIcon
