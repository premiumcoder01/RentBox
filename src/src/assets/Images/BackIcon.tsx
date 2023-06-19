import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BackIcon(props: any) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M0 12.5a12.5 12.5 0 1125 0 12.5 12.5 0 01-25 0zm20-1.25H10l4.375-4.375L12.6 5.1l-7.4 7.4 7.4 7.4 1.775-1.775L10 13.75h10v-2.5z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default BackIcon;
