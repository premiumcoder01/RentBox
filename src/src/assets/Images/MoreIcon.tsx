import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MoreIcon(props: any) {
  return (
    <Svg
      width={3}
      height={12}
      viewBox="0 0 3 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1.5 9a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
        fill="#7A7A7A"
      />
    </Svg>
  );
}

export default MoreIcon;
