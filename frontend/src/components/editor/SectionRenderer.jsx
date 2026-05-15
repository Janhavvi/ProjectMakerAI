// src/components/editor/SectionRenderer.jsx

import EditableText from './EditableText';

import './SectionRenderer.css';

function SectionRenderer({
  sections
}) {

  return (
    <div className="section-renderer">

      {sections.map(
        (section, index) => (

          <div
            className="render-section"
            key={index}
          >

            <EditableText
              text={section.title}
            />

            <EditableText
              text={section.content}
            />

          </div>

        )
      )}

    </div>
  );
}

export default SectionRenderer;