// src/pages/GeneratorPage.jsx

import { useMemo, useRef, useState } from 'react';
import api from '../services/api';
import Loader from '../components/common/Loader';
import './GeneratorPage.css';

const styleOptions = [
  'Apple Style',
  'Framer Style',
  'Vercel Style',
  'Cyberpunk',
  'Glassmorphism',
  'Anime UI',
  'Neobrutalism',
  'Minimal SaaS',
  'Gaming UI'
];

const themeOptions = [
  'Dark',
  'Light',
  'Cyberpunk',
  'Luxury',
  'Neon',
  'Glassmorphism',
  'Retro'
];

const industries = [
  {
    name: 'Auto detect',
    sections: []
  },
  {
    name: 'Gym',
    sections: ['trainer section', 'membership plans', 'BMI calculator', 'class schedule']
  },
  {
    name: 'Restaurant',
    sections: ['menu', 'table booking', 'chef section', 'reviews', 'gallery']
  },
  {
    name: 'AI SaaS',
    sections: ['features', 'pricing', 'integrations', 'testimonials', 'dashboard preview']
  },
  {
    name: 'Education',
    sections: ['courses', 'teachers', 'results', 'admissions', 'student reviews']
  },
  {
    name: 'Portfolio',
    sections: ['projects', 'skills', 'experience', 'case studies', 'contact']
  }
];

const pageTypes = [
  'Landing page',
  'Dashboard',
  'Login page',
  'Admin panel',
  'Pricing page',
  'Blog page'
];

const deviceSizes = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px'
};

const themeCss = {
  Dark: ':root{color-scheme:dark}body{background:#080810!important;color:#fff!important}',
  Light: ':root{color-scheme:light}body{background:#f8fafc!important;color:#111827!important}',
  Cyberpunk: 'body{background:#07020f!important;color:#f8e7ff!important}*{--accent:#ff2bd6!important;--primary:#00f5ff!important}',
  Luxury: 'body{background:#080604!important;color:#f7ead2!important}*{--accent:#d6a84f!important;--primary:#f6df9d!important}',
  Neon: 'body{background:#050816!important;color:#eaffff!important}*{--accent:#7c3cff!important;--primary:#00ffbf!important}',
  Glassmorphism: 'body{background:linear-gradient(135deg,#0f172a,#083344)!important;color:#fff!important}section,header,main,div{backdrop-filter:blur(14px)}',
  Retro: 'body{background:#22150f!important;color:#ffe8b8!important}*{--accent:#ff6f3c!important;--primary:#ffd166!important}'
};

function GeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState(styleOptions[0]);
  const [theme, setTheme] = useState(themeOptions[0]);
  const [industry, setIndustry] = useState(industries[0].name);
  const [pageType, setPageType] = useState(pageTypes[0]);
  const [device, setDevice] = useState('desktop');
  const [liveEdit, setLiveEdit] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [siteHtml, setSiteHtml] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const resultRef = useRef(null);

  const selectedIndustry = useMemo(
    () => industries.find((item) => item.name === industry) || industries[0],
    [industry]
  );

  const cleanCode = (code) => {
    return code
      .replace(/```html/g, '')
      .replace(/```css/g, '')
      .replace(/```javascript/g, '')
      .replace(/```js/g, '')
      .replace(/```/g, '')
      .trim();
  };

  const buildEnhancedPrompt = (extraInstruction = '') => {
    const smartSections = selectedIndustry.sections.length
      ? `Add these smart industry sections: ${selectedIndustry.sections.join(', ')}.`
      : 'Detect the industry from the prompt and add the most useful smart sections.';

    const screenshotInstruction = screenshot
      ? `The user uploaded a screenshot named "${screenshot.name}". Since direct vision analysis is not enabled yet, create a screenshot-inspired layout and ask the HTML to visually support clone/remix workflows.`
      : 'Do not require screenshot input.';

    return `
User request: ${prompt}

Builder settings:
- Page type: ${pageType}
- AI style engine: ${style}
- One-click theme: ${theme}
- Industry mode: ${industry}
- ${smartSections}
- ${screenshotInstruction}
- Add polished hover effects, scroll animations, responsive spacing, SEO tags, and a custom loader or intro.
- Include desktop, tablet, and mobile friendly CSS.
- Make export-ready HTML/CSS/JS in a single file.

Live AI edit instruction:
${extraInstruction || 'No extra edit yet.'}
`;
  };

  const generateWebsite = async (extraInstruction = '') => {
    if (!prompt.trim() && !extraInstruction.trim()) return;

    try {
      setLoading(true);
      setErrorMessage('');
      setStatusMessage('Connecting to the AI builder...');

      const response = await api.post('/ai/generate', {
        prompt: buildEnhancedPrompt(extraInstruction)
      });

      const cleaned = cleanCode(response.data.data || '');

      if (!cleaned) {
        throw new Error('The backend returned an empty website.');
      }

      setSiteHtml(cleaned);
      setStatusMessage(
        response.data.warning || 'Website generated. Opening preview below.'
      );

      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 120);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          'Website generation failed. Please try again.'
      );
      setStatusMessage('');
    } finally {
      setLoading(false);
    }
  };

  const startVoicePrompt = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('SpeechRecognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt((currentPrompt) =>
        currentPrompt ? `${currentPrompt} ${transcript}` : transcript
      );
    };

    recognition.start();
  };

  const applyLiveEdit = () => {
    if (!liveEdit.trim()) return;
    generateWebsite(liveEdit);
  };

  const themedHtml = useMemo(() => {
    if (!siteHtml) return '';
    const injectedStyle = `<style id="projectmaker-theme-switcher">${themeCss[theme] || ''}</style>`;

    if (siteHtml.includes('</head>')) {
      return siteHtml.replace('</head>', `${injectedStyle}</head>`);
    }

    return `${injectedStyle}${siteHtml}`;
  }, [siteHtml, theme]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(themedHtml || siteHtml);
    alert('Code copied!');
  };

  const exportHtml = () => {
    const blob = new Blob([themedHtml || siteHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'projectmaker-site.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  const openDeploy = (platform) => {
    const urls = {
      vercel: 'https://vercel.com/new',
      netlify: 'https://app.netlify.com/drop'
    };

    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="generator-page">
      <div className="generator-shell">
        <section className="generator-intro">
          <span className="generator-badge">AI Website Builder Studio</span>

          <h1>Prompt, style, edit, preview, and export websites</h1>

          <p>
            Build with the strongest ProjectMaker flow: prompt to website,
            screenshot-inspired cloning, voice prompts, smart sections, live AI edits,
            instant theme switching, and production export controls.
          </p>
        </section>

        <section className="builder-panel">
          <div className="prompt-panel">
            <label htmlFor="prompt">Website prompt</label>
            <textarea
              id="prompt"
              className="generator-input"
              placeholder="Create a modern dark fitness website with trainer cards, pricing plans, BMI calculator, animations, and mobile preview..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <div className="builder-actions">
              <button
                className="generate-btn"
                type="button"
                disabled={loading}
                onClick={() => generateWebsite()}
              >
                {loading ? 'Generating...' : 'Generate Website'}
              </button>

              <button className="tool-btn" type="button" onClick={startVoicePrompt}>
                {listening ? 'Listening...' : 'Voice Prompt'}
              </button>
            </div>

            {(statusMessage || errorMessage) && (
              <div className={errorMessage ? 'generator-message error' : 'generator-message'}>
                {errorMessage || statusMessage}
              </div>
            )}
          </div>

          <div className="settings-panel">
            <div className="field-group">
              <label>AI Style Engine</label>
              <div className="option-grid">
                {styleOptions.map((option) => (
                  <button
                    className={style === option ? 'option active' : 'option'}
                    type="button"
                    key={option}
                    onClick={() => setStyle(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-row">
              <div className="field-group">
                <label htmlFor="theme">Theme switcher</label>
                <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
                  {themeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="industry">Industry AI</label>
                <select id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  {industries.map((option) => (
                    <option key={option.name}>{option.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-row">
              <div className="field-group">
                <label htmlFor="pageType">AI Page Generator</label>
                <select id="pageType" value={pageType} onChange={(e) => setPageType(e.target.value)}>
                  {pageTypes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="screenshot">Screenshot to Website</label>
                <input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            {selectedIndustry.sections.length > 0 && (
              <div className="smart-sections">
                {selectedIndustry.sections.map((section) => (
                  <span key={section}>{section}</span>
                ))}
              </div>
            )}
          </div>
        </section>

        {loading && <Loader />}

        {siteHtml && (
          <section className="result-section" ref={resultRef}>
            <div className="preview-toolbar">
              <div>
                <span className="toolbar-label">Multi-device live preview</span>
                <h2>Generated Website</h2>
              </div>

              <div className="device-tabs">
                {Object.keys(deviceSizes).map((size) => (
                  <button
                    type="button"
                    className={device === size ? 'device-tab active' : 'device-tab'}
                    key={size}
                    onClick={() => setDevice(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="preview-frame-wrap">
              <iframe
                title="Generated Website"
                className="site-preview"
                style={{ width: deviceSizes[device] }}
                srcDoc={themedHtml}
              />
            </div>

            <div className="live-edit-panel">
              <div>
                <span className="toolbar-label">Live AI edit chat</span>
                <h2>Edit with instructions</h2>
              </div>

              <textarea
                className="live-edit-input"
                placeholder="make navbar transparent, add pricing section, change colors to purple, add animations..."
                value={liveEdit}
                onChange={(e) => setLiveEdit(e.target.value)}
              />

              <button className="generate-btn" type="button" onClick={applyLiveEdit}>
                Apply Live Edit
              </button>
            </div>

            <div className="export-panel">
              <button className="copy-btn" onClick={copyCode}>Copy Code</button>
              <button className="copy-btn" onClick={exportHtml}>Export HTML</button>
              <button className="copy-btn" onClick={exportHtml}>Export ZIP Ready File</button>
              <button className="copy-btn" onClick={exportHtml}>Export React Starter</button>
              <button className="copy-btn" onClick={() => openDeploy('vercel')}>Deploy to Vercel</button>
              <button className="copy-btn" onClick={() => openDeploy('netlify')}>Deploy to Netlify</button>
            </div>

            <div className="code-header">
              <h2>Generated Code</h2>
            </div>

            <pre className="code-box">{themedHtml}</pre>
          </section>
        )}
      </div>
    </div>
  );
}

export default GeneratorPage;
