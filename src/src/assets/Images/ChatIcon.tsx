import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ChatIcon(props: any) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12.75 8.5V.85A.85.85 0 0011.9 0H.85A.85.85 0 000 .85v11.9l3.4-3.4h8.5a.85.85 0 00.85-.85zm3.4-5.1h-1.7v7.65H3.4v1.7a.85.85 0 00.85.85h9.35L17 17V4.25a.85.85 0 00-.85-.85z"
        fill={props.color}
      />
    </Svg>
  );
}

export default ChatIcon;
