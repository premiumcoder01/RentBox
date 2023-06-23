import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Instagram(props) {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.45 0h7.638a5.278 5.278 0 015.275 5.274v7.64a5.274 5.274 0 01-5.275 5.274H5.45a5.278 5.278 0 01-5.274-5.275V5.274A5.274 5.274 0 015.449 0zm-.183 1.819a3.274 3.274 0 00-3.273 3.274v8.002a3.272 3.272 0 003.273 3.274h8.003a3.274 3.274 0 003.274-3.274V5.093a3.272 3.272 0 00-3.274-3.274H5.267zm8.776 1.364a1.137 1.137 0 110 2.273 1.137 1.137 0 010-2.273zM9.269 4.547a4.547 4.547 0 110 9.094 4.547 4.547 0 010-9.094zm0 1.819a2.728 2.728 0 100 5.456 2.728 2.728 0 000-5.456z"
        fill="#159DEA"
      />
    </Svg>
  )
}

export default Instagram
