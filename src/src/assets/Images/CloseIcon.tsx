import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CloseIcon(props:any) {
  return (
    <Svg
      width={80}
      height={44}
      viewBox="0 0 80 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 22C0 9.85 9.85 0 22 0h58v44H22C9.85 44 0 34.15 0 22z"
        fill="#159DEA"
      />
      <Path
        d="M23.5 7C32.072 7 39 13.705 39 22s-6.928 15-15.5 15S8 30.295 8 22 14.928 7 23.5 7zm5.564 7.5L23.5 19.885 17.936 14.5l-2.186 2.115L21.314 22l-5.564 5.385 2.186 2.115 5.564-5.385 5.564 5.385 2.186-2.115L25.686 22l5.564-5.385-2.186-2.115z"
        fill="#fff"
      />
    </Svg>
  )
}

export default CloseIcon