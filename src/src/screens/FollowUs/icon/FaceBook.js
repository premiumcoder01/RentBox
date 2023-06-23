import * as React from 'react';
import Svg, {G, Circle, Path, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function FaceBook(props) {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9.094 0C4.092 0 0 4.083 0 9.112a9.113 9.113 0 007.675 9.003V11.75h-2.31V9.112h2.31v-2.01c0-2.282 1.355-3.537 3.438-3.537.991 0 2.028.173 2.028.173v2.246h-1.146c-1.128 0-1.482.7-1.482 1.418v1.71h2.528l-.41 2.637h-2.118v6.366a9.093 9.093 0 007.675-9.003C18.188 4.083 14.096 0 9.094 0z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default FaceBook;
