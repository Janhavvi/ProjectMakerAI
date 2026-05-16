import { useState } from 'react';
import { Link } from 'react-router-dom';
import { analyzeAIProject } from '../services/aiService';
import './AIToolPage.css';

function ProjectAnalyzerPage() {
  const [idea, setIdea] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    try {
      setAnalysis(await analyzeAIProject(idea));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="ai-tool-page">
      <div className="ai-tool-shell">
        <header className="ai-tool-hero">
          <div>
            <span className="tool-kicker">AI Project Analyzer</span>
            <h1>Score feasibility, stack, roadmap, and monetization.</h1>
            <p>Analyze difficulty, features, API endpoints, database models, UI pages, timeline, and improvement ideas.</p>
          </div>
          <div className="tool-actions">
            <Link to="/ai-project-generator">Project generator</Link>
          </div>
        </header>

        <section className="ai-tool-grid">
          <div className="tool-card">
            <span className="tool-kicker">Idea</span>
            <textarea
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="Paste your project idea here..."
            />
            <div className="tool-actions">
              <button type="button" onClick={analyze} disabled={loading}>
                {loading ? 'Analyzing...' : 'Analyze project'}
              </button>
            </div>
          </div>

          <div className="tool-output">
            <pre className="json-output">
              {analysis ? JSON.stringify(analysis, null, 2) : 'Your AI analysis will appear here.'}
            </pre>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProjectAnalyzerPage;
