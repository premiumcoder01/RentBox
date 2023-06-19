import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function AttachIcon(props: any) {
  return (
    <Svg
      width={17}
      height={22}
      viewBox="0 0 17 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M15.058 7.697L9.954 18.002a4 4 0 11-7.169-3.55L8.332 3.25a2.5 2.5 0 014.481 2.22l-4.66 9.409a1 1 0 11-1.792-.888l4.216-8.513-1.344-.666-4.216 8.513a2.5 2.5 0 104.48 2.22l4.66-9.41a4 4 0 00-7.169-3.55L1.441 13.786a5.5 5.5 0 109.857 4.882l5.104-10.306-1.344-.665z"
        fill="#919191"
      />
    </Svg>
  );
}

export default AttachIcon;
