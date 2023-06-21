import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Location(props: any) {
  return (
    <Svg
      width={9}
      height={13}
      viewBox="0 0 9 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M4.5 6.175c-.426 0-.835-.171-1.136-.476a1.634 1.634 0 010-2.298 1.598 1.598 0 012.272 0 1.634 1.634 0 01-.521 2.65 1.592 1.592 0 01-.615.124zM4.5 0C3.307 0 2.162.48 1.318 1.333A4.576 4.576 0 000 4.55C0 7.963 4.5 13 4.5 13S9 7.963 9 4.55a4.576 4.576 0 00-1.318-3.217A4.475 4.475 0 004.5 0z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default Location;
