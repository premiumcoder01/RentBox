import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Pen(props: any) {
  return (
    <Svg
      width={13}
      height={13}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12.789 2.92a.72.72 0 000-1.019l-1.69-1.69a.72.72 0 00-1.018 0L8.752 1.533 11.46 4.24M0 10.292V13h2.708l7.987-7.994-2.708-2.708L0 10.292z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default Pen;
