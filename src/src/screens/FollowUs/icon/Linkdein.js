import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Linkdein(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M15.382.91a1.819 1.819 0 011.82 1.818V15.46a1.819 1.819 0 01-1.82 1.819H2.651a1.82 1.82 0 01-1.819-1.82V2.73A1.819 1.819 0 012.651.908h12.731zm-.454 14.095v-4.82a2.964 2.964 0 00-2.965-2.964c-.773 0-1.673.472-2.11 1.182v-1.01H7.316v7.612h2.537v-4.483a1.27 1.27 0 112.537 0v4.483h2.538zM4.36 5.965a1.528 1.528 0 001.528-1.527c0-.846-.682-1.537-1.528-1.537a1.537 1.537 0 00-1.536 1.537c0 .846.69 1.528 1.536 1.528zm1.265 9.04V7.393h-2.52v7.612h2.52z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default Linkdein;
