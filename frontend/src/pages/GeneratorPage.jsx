// src/pages/GeneratorPage.jsx

import { useState } from 'react';
import api from '../services/api';
import Loader from '../components/common/Loader';
import './GeneratorPage.css';

function GeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [siteHtml, setSiteHtml] = useState('');

  const cleanCode = (code) => {
    return code
      .replace(/```html/g, '')
      .replace(/```css/g, '')
      .replace(/```javascript/g, '')
      .replace(/```js/g, '')
      .replace(/```/g, '')
      .trim();
  };

  const generateWebsite = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const response = await api.post('/ai/generate', {
        prompt
      });

      const cleaned = cleanCode(response.data.data || '');
      setSiteHtml(cleaned);
    } catch (error) {
      console.log(error);
      alert('Website generation failed');
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(siteHtml);
    alert('Code copied!');
  };

  return (
    <div className="generator-page">
      <div className="generator-container">
        <span className="generator-badge">
          AI Website Builder
        </span>

        <h1>Generate Websites With AI</h1>

        <p>
          Create premium responsive websites with live preview and clean code.
        </p>

        <textarea
          className="generator-input"
          placeholder="Create a futuristic AI startup landing page..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button className="generate-btn" onClick={generateWebsite}>
          {loading ? 'Generating...' : 'Generate Website'}
        </button>

        {loading && <Loader />}

        {siteHtml && (
          <div className="result-section">
            <h2>Live Preview</h2>

            <iframe
              title="Generated Website"
              className="site-preview"
              srcDoc={siteHtml}
            />

            <div className="code-header">
              <h2>Generated Code</h2>

              <button className="copy-btn" onClick={copyCode}>
                📋 Copy Code
              </button>
            </div>

            <pre className="code-box">{siteHtml}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default GeneratorPage;