import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function FollowIcon(props: any) {
  return (
    <Svg
    width={15}
    height={15}
    viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14 13v2H0v-2s0-4 7-4 7 4 7 4zm-3.5-9.5a3.5 3.5 0 10-7 0 3.5 3.5 0 007 0zM13.94 9A5.32 5.32 0 0116 13v2h4v-2s0-3.63-6.06-4zM13 0a3.39 3.39 0 00-1.93.59 5 5 0 010 5.82A3.39 3.39 0 0013 7a3.5 3.5 0 100-7z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default FollowIcon;
