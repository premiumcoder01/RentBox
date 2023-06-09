import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function LoadMore(props: any) {
  return (
    <Svg
      width={65}
      height={17}
      viewBox="0 0 65 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M57.94 5L61 8.093 64.06 5l.94.957L61 10l-4-4.043.94-.957zM2.301 10.08h2.35V11h-3.49V4.05h1.14v6.03zm5.693 1.01c-.52 0-.99-.117-1.41-.35-.42-.24-.75-.573-.99-1-.24-.433-.36-.933-.36-1.5 0-.56.124-1.057.37-1.49a2.556 2.556 0 011.01-1 2.93 2.93 0 011.43-.35 2.93 2.93 0 011.43.35c.427.233.764.567 1.01 1 .247.433.37.93.37 1.49 0 .56-.126 1.057-.38 1.49-.253.433-.6.77-1.04 1.01-.433.233-.913.35-1.44.35zm0-.99c.294 0 .567-.07.82-.21.26-.14.47-.35.63-.63.16-.28.24-.62.24-1.02s-.076-.737-.23-1.01a1.545 1.545 0 00-.61-.63 1.668 1.668 0 00-.82-.21c-.293 0-.566.07-.82.21-.246.14-.443.35-.59.63-.146.273-.22.61-.22 1.01 0 .593.15 1.053.45 1.38.307.32.69.48 1.15.48zm3.607-1.88c0-.553.114-1.043.34-1.47a2.54 2.54 0 012.26-1.35c.434 0 .81.087 1.13.26.327.167.587.377.78.63v-.8h1.15V11h-1.15v-.82c-.193.26-.456.477-.79.65-.333.173-.713.26-1.14.26-.473 0-.906-.12-1.3-.36a2.673 2.673 0 01-.94-1.02 3.207 3.207 0 01-.34-1.49zm4.51.02c0-.38-.08-.71-.24-.99a1.614 1.614 0 00-.61-.64 1.609 1.609 0 00-.82-.22 1.61 1.61 0 00-.82.22c-.253.14-.46.35-.62.63-.153.273-.23.6-.23.98s.077.713.23 1c.16.287.367.507.62.66a1.645 1.645 0 001.64 0c.254-.147.457-.36.61-.64.16-.287.24-.62.24-1zm2.268-.02c0-.553.113-1.043.34-1.47a2.54 2.54 0 012.27-1.35c.36 0 .713.08 1.06.24.353.153.633.36.84.62V3.6h1.15V11h-1.15v-.83a2.125 2.125 0 01-.78.66c-.327.173-.704.26-1.13.26-.48 0-.92-.12-1.32-.36a2.672 2.672 0 01-.94-1.02 3.205 3.205 0 01-.34-1.49zm4.51.02c0-.38-.08-.71-.24-.99a1.615 1.615 0 00-.61-.64 1.609 1.609 0 00-.82-.22c-.294 0-.567.073-.82.22-.254.14-.46.35-.62.63-.154.273-.23.6-.23.98s.076.713.23 1c.16.287.366.507.62.66a1.644 1.644 0 001.64 0c.253-.147.456-.36.61-.64.16-.287.24-.62.24-1zm12.565-4.19V11h-1.14V6.24L32.194 11h-.79l-2.13-4.76V11h-1.14V4.05h1.23l2.44 5.45 2.43-5.45h1.22zm3.888 7.04c-.52 0-.99-.117-1.41-.35-.42-.24-.75-.573-.99-1-.24-.433-.36-.933-.36-1.5 0-.56.123-1.057.37-1.49a2.556 2.556 0 011.01-1c.427-.233.903-.35 1.43-.35a2.93 2.93 0 011.43.35c.427.233.764.567 1.01 1 .247.433.37.93.37 1.49 0 .56-.127 1.057-.38 1.49-.253.433-.6.77-1.04 1.01-.433.233-.913.35-1.44.35zm0-.99c.294 0 .567-.07.82-.21.26-.14.47-.35.63-.63.16-.28.24-.62.24-1.02s-.076-.737-.23-1.01a1.545 1.545 0 00-.61-.63 1.668 1.668 0 00-.82-.21c-.293 0-.566.07-.82.21-.246.14-.443.35-.59.63-.147.273-.22.61-.22 1.01 0 .593.15 1.053.45 1.38.307.32.69.48 1.15.48zm5.127-3.81c.167-.28.387-.497.66-.65.28-.16.61-.24.99-.24v1.18h-.29c-.447 0-.787.113-1.02.34-.227.227-.34.62-.34 1.18V11h-1.14V5.49h1.14v.8zm7.748 1.82c0 .207-.013.393-.04.56h-4.21c.033.44.197.793.49 1.06s.653.4 1.08.4c.613 0 1.047-.257 1.3-.77h1.23c-.167.507-.47.923-.91 1.25-.433.32-.973.48-1.62.48-.527 0-1-.117-1.42-.35a2.616 2.616 0 01-.98-1c-.233-.433-.35-.933-.35-1.5s.113-1.063.34-1.49a2.46 2.46 0 01.97-1c.42-.233.9-.35 1.44-.35.52 0 .983.113 1.39.34.407.227.723.547.95.96.227.407.34.877.34 1.41zm-1.19-.36c-.007-.42-.157-.757-.45-1.01-.293-.253-.657-.38-1.09-.38-.393 0-.73.127-1.01.38-.28.247-.447.583-.5 1.01h3.05z"
        fill="#159DEA"
      />
      <Path stroke="#159DEA" d="M1 16.5L65 16.5" />
    </Svg>
  );
}

export default LoadMore;
