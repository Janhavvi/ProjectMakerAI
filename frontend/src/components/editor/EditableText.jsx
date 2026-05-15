// src/components/editor/EditableText.jsx

import {
  useState
} from 'react';

import './EditableText.css';

function EditableText({
  text
}) {

  const [content, setContent] =
    useState(text);

  return (
    <div
      className="editable-text"

      contentEditable

      suppressContentEditableWarning

      onInput={(e) =>
        setContent(
          e.currentTarget.textContent
        )
      }
    >
      {content}
    </div>
  );
}

export default EditableText;