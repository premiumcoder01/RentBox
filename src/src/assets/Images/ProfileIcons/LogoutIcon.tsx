import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function LogoutIcon(props: any) {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 11 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7.944 9.75V7.8H3.667V5.2h4.277V3.25L11 6.5 7.944 9.75zM6.722 0c.324 0 .635.137.864.38.23.245.358.575.358.92v1.3H6.722V1.3h-5.5v10.4h5.5v-1.3h1.222v1.3c0 .345-.128.675-.358.92-.229.243-.54.38-.864.38h-5.5c-.324 0-.635-.137-.864-.38A1.343 1.343 0 010 11.7V1.3C0 .955.129.625.358.38.588.138.898 0 1.222 0h5.5z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default LogoutIcon;
