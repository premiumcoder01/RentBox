import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PhoneIcon(props: any) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M2.413 5.193a10.065 10.065 0 004.394 4.394L8.273 8.12a.669.669 0 01.68-.167c.747.247 1.547.38 2.38.38A.667.667 0 0112 9v2.333a.666.666 0 01-.667.667A11.333 11.333 0 010 .667.667.667 0 01.667 0H3a.667.667 0 01.667.667c0 .833.133 1.633.38 2.38a.669.669 0 01-.167.68L2.413 5.193z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default PhoneIcon;
