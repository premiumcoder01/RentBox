import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function EditIcon(props: any) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M4 10.352l4.848-4.848 1.648 1.648L5.648 12H4v-1.648zM8 14.4A6.4 6.4 0 108 1.6a6.4 6.4 0 000 12.8zm3.76-8.52l-.8.8-1.64-1.64.8-.8a.425.425 0 01.616 0l1.024 1.024a.425.425 0 010 .616zM8 0a8 8 0 110 16A8 8 0 018 0z"
        fill="#159DEA"
      />
    </Svg>
  );
}

export default EditIcon;
