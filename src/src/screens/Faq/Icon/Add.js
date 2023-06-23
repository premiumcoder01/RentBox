import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Add(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11 19.8c-4.851 0-8.8-3.949-8.8-8.8 0-4.851 3.949-8.8 8.8-8.8 4.851 0 8.8 3.949 8.8 8.8 0 4.851-3.949 8.8-8.8 8.8zM11 0a11 11 0 100 22 11 11 0 000-22zm1.1 5.5H9.9v4.4H5.5v2.2h4.4v4.4h2.2v-4.4h4.4V9.9h-4.4V5.5z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default Add;
