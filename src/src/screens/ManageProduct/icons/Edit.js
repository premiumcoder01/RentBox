import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Edit(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8 0C3.576 0 0 3.576 0 8c0 4.424 3.576 8 8 8 4.424 0 8-3.576 8-8 0-4.424-3.576-8-8-8zm2.48 4.056c.112 0 .224.04.32.128L11.816 5.2a.422.422 0 010 .624l-.8.8-1.64-1.64.8-.8a.405.405 0 01.304-.128zM8.904 5.448l1.648 1.648-4.848 4.848H4.056v-1.648l4.848-4.848z"
        fill="#159DEA"
      />
    </Svg>
  )
}

export default Edit