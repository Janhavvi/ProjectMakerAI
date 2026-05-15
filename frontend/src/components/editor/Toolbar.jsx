// src/components/editor/Toolbar.jsx

import './Toolbar.css';

function Toolbar() {

  return (
    <div className="editor-toolbar">

      <button>
        Undo
      </button>

      <button>
        Redo
      </button>

      <button>
        Preview
      </button>

      <button>
        Export
      </button>

    </div>
  );
}

export default Toolbar;