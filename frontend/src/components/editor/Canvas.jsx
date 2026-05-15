// src/components/editor/Canvas.jsx

import './Canvas.css';

function Canvas({
  children
}) {

  return (
    <div className="editor-canvas">

      {children}

    </div>
  );
}

export default Canvas;