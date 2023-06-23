import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Faq(props: any) {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M16 13H4l-4 4V1a1 1 0 011-1h15a1 1 0 011 1v11a1 1 0 01-1 1zm5-6v14l-4-4H6a1 1 0 01-1-1v-1h14V6h1a1 1 0 011 1zM6.19 2c-.87 0-1.57.2-2.11.59-.52.41-.78.98-.77 1.77l.01.03h1.93c.01-.3.1-.53.28-.69a1 1 0 01.66-.23c.31 0 .57.1.75.28.18.19.26.45.26.75 0 .32-.07.59-.23.82-.14.23-.35.43-.61.59-.51.34-.86.64-1.05.91C5.11 7.08 5 7.5 5 8h2c0-.31.04-.56.13-.74.09-.18.26-.36.51-.52.45-.24.82-.53 1.11-.93.29-.4.44-.81.44-1.31 0-.76-.27-1.37-.81-1.82C7.85 2.23 7.12 2 6.19 2zM5 9v2h2V9H5zm6 2h2V9h-2v2zm0-9v6h2V2h-2z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default Faq;
