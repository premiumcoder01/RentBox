import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Delete(props) {
  return (
    <Svg
      width={12}
      height={16}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12 .889H9L8.143 0H3.857L3 .889H0v1.778h12M.857 14.222c0 .472.18.924.502 1.257.322.334.758.521 1.212.521H9.43c.454 0 .89-.187 1.212-.52.321-.334.502-.786.502-1.258V3.556H.857v10.666z"
        fill="red"
      />
    </Svg>
  );
}

export default Delete;
