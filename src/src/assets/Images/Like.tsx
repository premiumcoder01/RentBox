import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Like(props: any) {
  return (
    <Svg
      width={10}
      height={9}
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5 9l-.725-.647C1.7 6.063 0 4.547 0 2.698 0 1.182 1.21 0 2.75 0 3.62 0 4.455.397 5 1.02A3.031 3.031 0 017.25 0C8.79 0 10 1.182 10 2.698c0 1.849-1.7 3.364-4.275 5.655L5 9z"
        fill={props.color}
      />
    </Svg>
  );
}

export default Like;
