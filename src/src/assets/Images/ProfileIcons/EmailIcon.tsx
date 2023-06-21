import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function EmailIcon(props: any) {
  return (
    <Svg
      width={15}
      height={8}
      viewBox="0 0 15 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.75 0H5.625c-.688 0-1.25.554-1.25 1.23v5.54c0 .682.563 1.23 1.25 1.23h8.125C14.444 8 15 7.452 15 6.77V1.23A1.24 1.24 0 0013.75 0zm0 6.77H5.625V2.257l4.063 2.05 4.062-2.05V6.77zM9.687 3.267L5.625 1.23h8.125L9.687 3.268zM3.125 6.769c0 .105.019.203.031.308H.625A.621.621 0 010 6.462c0-.339.28-.616.625-.616h2.5v.923zM1.875.923h1.281c-.012.105-.031.203-.031.308v.923h-1.25a.622.622 0 01-.625-.616c0-.338.281-.615.625-.615zM.625 4c0-.338.281-.615.625-.615h1.875v1.23H1.25A.622.622 0 01.625 4z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default EmailIcon;
