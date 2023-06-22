import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ShareIcon(props: any) {
  return (
    <Svg
      width={16}
      height={13}
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M16 6.067L9.778 0v3.467C3.556 4.333.888 8.667 0 13c2.222-3.033 5.333-4.42 9.778-4.42v3.553L16 6.067z"
        fill="#494949"
      />
    </Svg>
  );
}

export default ShareIcon;
