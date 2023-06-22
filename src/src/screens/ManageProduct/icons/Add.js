import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function Add(props) {
  return (
    <Svg
      width={42}
      height={42}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={42} height={42} rx={21} fill="#159DEA" />
      <Path
        d="M27.563 21.938h-5.625v5.625h-1.875v-5.625h-5.625v-1.875h5.624v-5.625h1.875v5.624h5.625v1.875z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Add
