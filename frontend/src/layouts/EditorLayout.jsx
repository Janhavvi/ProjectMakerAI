// src/layouts/EditorLayout.jsx

import { useState } from 'react';
import './EditorLayout.css';

/**
 * Premium Editor Layout
 * Split-view layout with responsive sidebar and preview
 */
function EditorLayout({ sidebar, preview, preview_only = false }) {
  const [sidebarVisible, setSidebarVisible] = useState(!preview_only);
  const [previewVisible, setPreviewVisible] = useState(true);

  return (
    <div className="editor-layout">
      {/* Responsive Sidebar */}
      {!preview_only && (
        <aside className={`editor-sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
          <div className="sidebar-header">
            <h2 className="sidebar-title">Project Settings</h2>
            <button
              className="sidebar-close"
              onClick={() => setSidebarVisible(false)}
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>
          <div className="sidebar-content">
            {sidebar}
          </div>
        </aside>
      )}

      {/* Main Preview Area */}
      <main className={`editor-preview ${previewVisible ? 'visible' : 'hidden'}`}>
        <div className="preview-content">
          {preview}
        </div>
      </main>

      {/* Toggle Buttons */}
      {!preview_only && (
        <div className="editor-controls">
          <button
            className={`control-btn ${sidebarVisible ? 'active' : ''}`}
            onClick={() => setSidebarVisible(!sidebarVisible)}
            title="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default EditorLayout;