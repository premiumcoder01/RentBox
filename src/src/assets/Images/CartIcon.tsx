import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CartIcon(props:any) {
  return (
    <Svg
      width={95}
      height={84}
      viewBox="0 0 95 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.175 66.201c-3.951 0-7.156-3.192-7.156-7.143 0-3.952 3.205-7.144 7.156-7.144a7.137 7.137 0 017.144 7.143 7.137 7.137 0 01-7.144 7.144zm2.606-7.143a2.61 2.61 0 00-2.606-2.618 2.613 2.613 0 00-2.618 2.617 2.603 2.603 0 002.618 2.606 2.6 2.6 0 002.606-2.605zM60.148 66.201a7.137 7.137 0 01-7.144-7.143 7.137 7.137 0 017.144-7.144 7.137 7.137 0 017.144 7.143 7.137 7.137 0 01-7.144 7.144zm2.618-7.143a2.62 2.62 0 00-2.618-2.618 2.61 2.61 0 00-2.605 2.617 2.6 2.6 0 002.605 2.606 2.61 2.61 0 002.618-2.605z"
        fill="#fff"
      />
      <Path
        d="M78.947 15.575c-1.504-.25-1.347 0-1.886 0-.809.27-.31 2.505-1.04 4.606a45.559 45.559 0 01-1.725 4.257c-.469 1.107-.021.046 0 0-1.008 2.35 1.04-2.425 0 0-.808 1.886-1.008 2.184-2.74 4.93-.317.488.542-.86 0 0-.22.33-.428.672-.66 1.003a41.976 41.976 0 01-5.065 5.933c-3.32 2.713-3.32 2.713 0 0-3.32 2.713-.087 0-3.32 2.713-2.05 2.155 3.32-2.714-2.32 1.886-3.571 2.36-7.486 4.147-11.571 5.223l-1.688.367c-.563.123-1.126.257-1.652.306a22.163 22.163 0 01-3.205.257c-2.104-.012-4.11-.404-5.847-1.223a10.95 10.95 0 01-4.294-3.597c-1.113-1.553-1.896-3.437-2.349-5.48l-.17-.758-.11-.795c-.062-.539-.148-1.028-.197-1.676l-.367-3.707-.71-7.4c-.11-1.236-.293-2.447-.33-3.72a32.215 32.215 0 00-.599-4.244c-.6-2.826-1.614-5.664-3.413-8.306a15.586 15.586 0 00-3.4-3.633c-3.12-2.41-6.35-2.863-9.554-2.3-4.783.832-7.352 6.116-5.077 10.41l3.499-1.86c1.663-.88 3.217-1.137 4.477-.831 1.26.281 2.532 1.199 3.572 2.703 1.052 1.493 1.81 3.413 2.263 5.468.232 1.028.38 2.08.477 3.18.037 1.224.245 2.496.367 3.744l.869 7.523.44 3.756c.061.587.183 1.345.294 2.042l.17 1.065.258 1.052c.685 2.825 1.883 5.651 3.767 8.098a18.009 18.009 0 007.267 5.688c2.838 1.235 5.871 1.688 8.758 1.615 1.456-.061 2.875-.196 4.257-.465.71-.11 1.358-.282 2.019-.453l1.957-.514c5.187-1.565 10.043-4.098 14.3-7.34 4.232-3.29 7.829-7.327 10.68-11.804a47.605 47.605 0 005.969-14.618l.024-.098c.04-.187.057-.383.049-.587-.061-1.199-1.245-2.367-2.444-2.416zM3.62 71.608s42.766-11.254 90.792-1.284c0 0-47.047-5.126-94.412 13.676 0 0 .979-8.404 3.62-12.392z"
        fill="#fff"
      />
    </Svg>
  )
}

export default CartIcon