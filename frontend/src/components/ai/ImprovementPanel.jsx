import './ImprovementPanel.css';

function ImprovementPanel({ report, onApply }) {
  if (!report) {
    return (
      <aside className="improvement-panel empty">
        <span>AI Design Assistant</span>
        <h3>No report yet</h3>
        <p>Run Analyze & Improve to get design, mobile, SEO, and conversion suggestions.</p>
      </aside>
    );
  }

  const scores = [
    ['Design', report.designScore],
    ['UI', report.uiScore],
    ['Mobile', report.mobileScore],
    ['SEO', report.seoScore],
    ['Conversion', report.conversionScore]
  ];

  return (
    <aside className="improvement-panel">
      <span>AI Design Score</span>
      <h3>{report.designScore || 0}/100</h3>

      <div className="score-grid">
        {scores.map(([label, score]) => (
          <div key={label}>
            <strong>{score || 0}</strong>
            <p>{label}</p>
          </div>
        ))}
      </div>

      <div className="suggestion-list">
        {(report.suggestions || []).map((suggestion) => (
          <article key={suggestion.issue}>
            <h4>{suggestion.issue}</h4>
            <p>{suggestion.whyItMatters}</p>
            <strong>{suggestion.suggestedFix}</strong>
            <button type="button" onClick={() => onApply?.(suggestion)}>
              Apply fix
            </button>
          </article>
        ))}
      </div>
    </aside>
  );
}

export default ImprovementPanel;
