import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SendIcon(props: any) {
  return (
    <Svg
      width={29}
      height={29}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.5 0a14.5 14.5 0 110 29 14.5 14.5 0 010-29zM8.7 8.28v4.843L19.053 14.5 8.7 15.877v4.844L23.2 14.5 8.7 8.28z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default SendIcon;
