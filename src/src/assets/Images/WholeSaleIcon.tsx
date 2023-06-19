import * as React from "react"
import Svg, { Path } from "react-native-svg"

function WholeSaleIcon(props:any) {
  return (
    <Svg
      width={22}
      height={16}
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2 0a2 2 0 00-2 2v11h2a3 3 0 006 0h6a3 3 0 006 0h2V8l-3-4h-3V0M9 2l4 4-4 4V7H3V5h6m7 .5h2.5L20.47 8H16M5 11.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm12 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
        fill={props.color}
      />
    </Svg>
  )
}

export default WholeSaleIcon