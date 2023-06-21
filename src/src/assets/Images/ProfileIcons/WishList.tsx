import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Wish(props: any) {
  return (
    <Svg
      width={14}
      height={13}
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7 13l-1.015-.935C2.38 8.756 0 6.567 0 3.896 0 1.707 1.694 0 3.85 0 5.068 0 6.237.574 7 1.474 7.763.574 8.932 0 10.15 0 12.306 0 14 1.707 14 3.896c0 2.671-2.38 4.86-5.985 8.169L7 13z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default Wish;
