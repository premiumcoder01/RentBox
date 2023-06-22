import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function OnBoardingCircle(props:any) {
  return (
    <Svg
      // width={375}
      height={395}
      viewBox="0 0 375 395"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={187.5} cy={249.5} r={249.5} fill="#159DEA" />
    </Svg>
  )
}

export default OnBoardingCircle