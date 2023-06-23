import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SmallUploadIcon(props) {
  return (
    <Svg
      width={22}
      height={18}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M0 10.588h2.2v5.294h17.6v-5.294H22v5.294C22 17.058 21.021 18 19.8 18H2.2C.99 18 0 17.058 0 15.882v-5.294zM11 0L4.906 5.781l1.562 1.504L9.9 3.97v9.794h2.2V3.97l3.443 3.314 1.562-1.514L11 0z"
        fill="#C9C9C9"
      />
    </Svg>
  );
}

export default SmallUploadIcon;
