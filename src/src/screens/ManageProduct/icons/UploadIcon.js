import * as React from "react"
import Svg, { Path } from "react-native-svg"

function UploadIcon(props) {
  return (
    <Svg
      width={50}
      height={42}
      viewBox="0 0 50 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 24.706h5v12.353h40V24.706h5v12.353C50 39.8 47.775 42 45 42H5c-2.75 0-5-2.199-5-4.941V24.706zM25 0L11.15 13.49l3.55 3.508 7.8-7.733v22.853h5V9.265l7.825 7.733 3.55-3.533L25 0z"
        fill="#C9C9C9"
      />
    </Svg>
  )
}

export default UploadIcon
