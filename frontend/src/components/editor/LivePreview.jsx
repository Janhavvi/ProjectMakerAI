// src/components/editor/LivePreview.jsx

import './LivePreview.css';

function LivePreview({
  children
}) {

  return (
    <div className="live-preview">

      {children}

    </div>
  );
}

export default LivePreview;