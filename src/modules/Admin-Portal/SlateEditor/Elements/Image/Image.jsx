import { useSelected, useFocused } from 'slate-react';
import './Image.css';

const Image = ({ attributes, element, children }) => {
  const { file, width, height } = element;
  const selected = useSelected();
  const focused = useFocused();

  const imageUrl = URL.createObjectURL(file);

  return (
    <div
      {...attributes}
      className='element-image'
      style={{
        display: 'flex',
        justifyContent: 'center',
        boxShadow: selected && focused && '0 0 3px 3px lightgray',
      }}
    >
      <div contentEditable={false} style={{ width: width, height: height }}>
        <img alt='img1' src={imageUrl} />
      </div>
      {children}
    </div>
  );
};

export default Image;
