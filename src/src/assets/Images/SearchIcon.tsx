import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function SearchIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={25} height={25} rx={12.5} fill="#159DEA" />
      <Path
        d="M11.679 7.5a4.179 4.179 0 013.175 6.898l.174.173h.508l3.214 3.215-.964.964-3.215-3.214v-.508l-.173-.174a4.179 4.179 0 11-2.72-7.354zm0 1.286a2.88 2.88 0 00-2.893 2.893 2.88 2.88 0 002.893 2.892 2.88 2.88 0 002.892-2.892 2.88 2.88 0 00-2.892-2.893z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SearchIcon;
