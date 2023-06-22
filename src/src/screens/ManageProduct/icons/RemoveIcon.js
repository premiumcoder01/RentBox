import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function RemoveIcon(props) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6 0c3.318 0 6 2.682 6 6s-2.682 6-6 6-6-2.682-6-6 2.682-6 6-6zm2.154 3L6 5.154 3.846 3 3 3.846 5.154 6 3 8.154 3.846 9 6 6.846 8.154 9 9 8.154 6.846 6 9 3.846 8.154 3z"
        fill="red"
      />
    </Svg>
  );
}

export default RemoveIcon;
