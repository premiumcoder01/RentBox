import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Privacy(props: any) {
  return (
    <Svg
      width={14}
      height={17}
      viewBox="0 0 14 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14 7.727c0 4.289-2.987 8.3-7 9.273-4.013-.974-7-4.984-7-9.273V3.091L7 0l7 3.09v4.637zm-7 7.727c2.917-.772 5.444-4.219 5.444-7.557V4.095L7 1.685l-5.444 2.41v3.802c0 3.338 2.527 6.785 5.444 7.557zM6.222 4.636h1.556v4.637H6.222V4.636zm0 6.182h1.556v1.546H6.222v-1.546z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default Privacy;
