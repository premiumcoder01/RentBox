import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Paper(props: any) {
  return (
    <Svg
      width={10}
      height={13}
      viewBox="0 0 10 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.625 4.55h3.438L5.624.975V4.55zM1.25 0h5L10 3.9v7.8c0 .345-.132.675-.366.92-.235.243-.552.38-.884.38h-7.5C.556 13 0 12.415 0 11.7V1.3C0 .578.556 0 1.25 0zm5.625 10.4V9.1H1.25v1.3h5.625zM8.75 7.8V6.5h-7.5v1.3h7.5z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default Paper;
