import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImprovementPanel from '../components/ai/ImprovementPanel';
import StyleSelector from '../components/ai/StyleSelector';
import { applyAIImprovement, improveAIWebsite, restyleAIWebsite } from '../services/aiService';
import { getProjectById, updateProject } from '../services/projectService';
import './AIToolPage.css';

function ProjectEditorPage({ previewOnly = false }) {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [code, setCode] = useState('');
  const [style, setStyle] = useState('Dark futuristic style');
  const [report, setReport] = useState(null);

  useEffect(() => {
    getProjectById(id).then((data) => {
      setProject(data);
      setCode(data.generatedCode || '');
    });
  }, [id]);

  const save = async () => {
    const updated = await updateProject(id, { generatedCode: code });
    setProject(updated);
  };

  const restyle = async () => {
    const result = await restyleAIWebsite({ projectId: id, html: code, style });
    setCode(result.html);
  };

  const improve = async () => {
    setReport(await improveAIWebsite({ projectId: id }));
  };

  const applySuggestion = async (suggestion) => {
    const updated = await applyAIImprovement({
      projectId: id,
      improvementText: suggestion.suggestedFix
    });
    setProject(updated);
    setCode(updated.generatedCode || '');
  };

  return (
    <main className="ai-tool-page">
      <div className="ai-tool-shell">
        <header className="ai-tool-hero">
          <div>
            <span className="tool-kicker">{previewOnly ? 'Live Preview' : 'Project Editor'}</span>
            <h1>{project?.title || 'Loading project...'}</h1>
            <p>Restyle, analyze, improve, save versions, and preview generated code.</p>
          </div>
          <div className="tool-actions">
            <Link to="/saved-projects">Saved projects</Link>
            <button type="button" onClick={save}>Save project</button>
          </div>
        </header>

        <section className="ai-tool-grid">
          {!previewOnly && (
            <div className="tool-card">
              <span className="tool-kicker">Code editor</span>
              <textarea value={code} onChange={(event) => setCode(event.target.value)} />
              <StyleSelector value={style} onChange={setStyle} />
              <div className="tool-actions" style={{ marginTop: 16 }}>
                <button type="button" onClick={restyle}>Restyle Website</button>
                <button type="button" onClick={improve}>Analyze & Improve</button>
              </div>
            </div>
          )}

          <div className="tool-output">
            <iframe
              title="Project live preview"
              sandbox="allow-scripts allow-forms allow-same-origin"
              srcDoc={code}
              style={{ width: '100%', minHeight: 620, border: 0, borderRadius: 10, background: '#fff' }}
            />
          </div>
        </section>

        {!previewOnly && (
          <div style={{ marginTop: 18 }}>
            <ImprovementPanel report={report} onApply={applySuggestion} />
          </div>
        )}
      </div>
    </main>
  );
}

export default ProjectEditorPage;
