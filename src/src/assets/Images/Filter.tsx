import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Filter(props: any) {
  return (
    <Svg
      width={14}
      height={12}
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M4.2 6.667c-1.302 0-2.387.853-2.702 2H0V10h1.498c.315 1.147 1.4 2 2.702 2s2.387-.853 2.702-2H14V8.667H6.902c-.315-1.147-1.4-2-2.702-2zm0 4c-.77 0-1.4-.6-1.4-1.334C2.8 8.6 3.43 8 4.2 8c.77 0 1.4.6 1.4 1.333 0 .734-.63 1.334-1.4 1.334zM12.502 2c-.315-1.147-1.4-2-2.702-2S7.413.853 7.098 2H0v1.333h7.098c.315 1.147 1.4 2 2.702 2s2.387-.853 2.702-2H14V2h-1.498zM9.8 4c-.77 0-1.4-.6-1.4-1.333 0-.734.63-1.334 1.4-1.334.77 0 1.4.6 1.4 1.334C11.2 3.4 10.57 4 9.8 4z"
        fill="#000"
      />
    </Svg>
  );
}

export default Filter;
