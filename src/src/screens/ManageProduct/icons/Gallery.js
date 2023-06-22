import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Gallery(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.5 8.4v2.1H8.4v1.4h2.1V14h1.4v-2.1H14v-1.4h-2.1V8.4h-1.4zm-3.29 4.2H1.4c-.77 0-1.4-.63-1.4-1.4V1.4C0 .63.63 0 1.4 0h9.8c.77 0 1.4.63 1.4 1.4v5.81c-.42-.14-.91-.21-1.4-.21-.77 0-1.54.21-2.17.63L8.05 6.3 5.6 9.45l-1.75-2.1L1.4 10.5h5.67c-.07.21-.07.49-.07.7 0 .49.07.98.21 1.4z"
        fill="#000"
      />
    </Svg>
  )
}

export default Gallery