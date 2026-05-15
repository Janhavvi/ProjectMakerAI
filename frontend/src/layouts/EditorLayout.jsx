// src/layouts/EditorLayout.jsx

import './EditorLayout.css';

function EditorLayout({
  sidebar,
  preview
}) {

  return (
    <div className="editor-layout">

      <div className="editor-sidebar">
        {sidebar}
      </div>

      <div className="editor-preview">
        {preview}
      </div>

    </div>
  );
}

export default EditorLayout;