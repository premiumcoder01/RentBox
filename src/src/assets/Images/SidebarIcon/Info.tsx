import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Info(props:any) {
  return (
    <Svg
      width={13}
      height={13}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.15 4.55h-1.3v-1.3h1.3m0 6.5h-1.3v-3.9h1.3M6.5 0a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"
        fill="#159DEA"
      />
    </Svg>
  )
}

export default Info