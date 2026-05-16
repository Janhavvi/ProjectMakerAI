import { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateAIProject } from '../services/aiService';
import './AIToolPage.css';

function AIProjectGeneratorPage() {
  const [idea, setIdea] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    try {
      setPlan(await generateAIProject(idea));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="ai-tool-page">
      <div className="ai-tool-shell">
        <header className="ai-tool-hero">
          <div>
            <span className="tool-kicker">AI Project Generator</span>
            <h1>Turn an idea into a complete product blueprint.</h1>
            <p>Generate features, pages, components, tech stack, schema, API routes, and deployment steps.</p>
          </div>
          <div className="tool-actions">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/generate">Website generator</Link>
          </div>
        </header>

        <section className="ai-tool-grid">
          <div className="tool-card">
            <span className="tool-kicker">Prompt</span>
            <textarea
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="Example: Build an AI resume analyzer SaaS with user accounts, resume upload, job matching, billing, and analytics..."
            />
            <div className="tool-actions">
              <button type="button" onClick={generate} disabled={loading}>
                {loading ? 'Generating...' : 'Generate project'}
              </button>
            </div>
          </div>

          <div className="tool-output">
            <pre className="json-output">
              {plan ? JSON.stringify(plan, null, 2) : 'Your generated project plan will appear here.'}
            </pre>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AIProjectGeneratorPage;
