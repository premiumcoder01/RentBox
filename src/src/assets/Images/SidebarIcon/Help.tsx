import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Help(props: any) {
  return (
    <Svg
      width={13}
      height={13}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.85 10.4h1.3V9.1h-1.3v1.3zM6.5 0a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm0 11.7a5.207 5.207 0 01-5.2-5.2c0-2.866 2.333-5.2 5.2-5.2s5.2 2.333 5.2 5.2-2.333 5.2-5.2 5.2zm0-9.1a2.6 2.6 0 00-2.6 2.6h1.3a1.3 1.3 0 112.6 0c0 1.3-1.95 1.138-1.95 3.25h1.3c0-1.462 1.95-1.625 1.95-3.25a2.6 2.6 0 00-2.6-2.6z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default Help;
