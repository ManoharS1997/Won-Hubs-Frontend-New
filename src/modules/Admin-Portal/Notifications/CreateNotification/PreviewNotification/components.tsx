import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

export default function ReadOnlyExample() {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [content, setContent] = useState(() => {
    const storedContent = localStorage.getItem('notificationContent');
    return storedContent ? JSON.parse(storedContent) : null;
});
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  
  const initialValue: Descendant[] = content===null ? [    {
      type: 'heading-two',
      children: [
        {
          text: 'Notification name:  ', 
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Receivers:  ',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Notification Content:  ',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Hi <Assigned Member>,',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: '<You can write your notification here>',
        },
      ],
    },
      ] : content
      
  // console.log(initialValue)
  
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable 
        readOnly 
        renderLeaf={renderLeaf}
        placeholder="Enter some plain text..." 
        renderElement={props => <Element {...props} />} 
        
      /> 
    </Slate>
  )
}

