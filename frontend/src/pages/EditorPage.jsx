// src/pages/EditorPage.jsx

import EditorLayout from '../layouts/EditorLayout';

import SidebarControls
from '../components/editor/SidebarControls';

import Toolbar
from '../components/editor/Toolbar';

import Canvas
from '../components/editor/Canvas';

import SectionRenderer
from '../components/editor/SectionRenderer';

function EditorPage() {

  const sections = [
    {
      title: 'Hero Section',
      content:
        'Build futuristic AI websites instantly.'
    },

    {
      title: 'Features Section',
      content:
        'AI generation, visual editing, export tools.'
    }
  ];

  return (
    <EditorLayout

      sidebar={
        <SidebarControls />
      }

      preview={
        <div>

          <Toolbar />

          <Canvas>

            <SectionRenderer
              sections={sections}
            />

          </Canvas>

        </div>
      }
    />
  );
}

export default EditorPage;