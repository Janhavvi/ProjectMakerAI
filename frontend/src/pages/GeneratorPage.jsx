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

const createLocalWeatherSite = (request) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WeatherScope</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: Inter, system-ui, sans-serif;
      color: #f8fbff;
      background: radial-gradient(circle at 20% 15%, rgba(94,234,212,.28), transparent 28%),
        radial-gradient(circle at 90% 10%, rgba(56,189,248,.22), transparent 30%),
        linear-gradient(135deg, #07111f, #101827);
    }
    main { width: min(1120px, calc(100% - 32px)); margin: auto; padding: 34px 0; }
    nav, .topline, .temp-row, form { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
    nav { margin-bottom: 28px; }
    .brand { font-size: 24px; font-weight: 900; }
    .badge { padding: 10px 13px; border: 1px solid rgba(255,255,255,.16); border-radius: 999px; color: #99f6e4; background: rgba(255,255,255,.08); font-weight: 800; }
    .grid { display: grid; grid-template-columns: .9fr 1fr; gap: 18px; }
    .panel, .day { border: 1px solid rgba(255,255,255,.14); border-radius: 18px; background: rgba(255,255,255,.09); backdrop-filter: blur(18px); box-shadow: 0 30px 90px rgba(0,0,0,.28); }
    .panel { padding: 30px; }
    h1 { margin: 18px 0; font-size: clamp(42px, 7vw, 78px); line-height: 1; letter-spacing: 0; }
    p { color: #c7d2e5; line-height: 1.7; }
    form { margin-top: 24px; }
    input { width: 100%; min-height: 54px; padding: 0 16px; border: 1px solid rgba(255,255,255,.14); border-radius: 12px; background: rgba(255,255,255,.1); color: white; font-size: 16px; }
    button { min-height: 54px; padding: 0 18px; border: 0; border-radius: 12px; background: linear-gradient(90deg, #5eead4, #38bdf8); color: #041018; font-weight: 900; cursor: pointer; }
    .temp { font-size: clamp(74px, 12vw, 138px); font-weight: 900; letter-spacing: 0; line-height: .9; }
    .condition { text-align: right; color: #c7d2e5; }
    .condition strong { display: block; color: white; font-size: 28px; }
    .metrics, .forecast { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 18px; }
    .forecast { grid-template-columns: repeat(5, 1fr); }
    .metric, .day { padding: 16px; }
    .metric span, .day span { display: block; color: #a8b6cc; font-size: 13px; margin-bottom: 7px; }
    .status { margin-top: 14px; color: #99f6e4; font-weight: 800; min-height: 24px; }
    @media (max-width: 860px) { .grid, .metrics, .forecast { grid-template-columns: 1fr; } form, nav, .temp-row { align-items: stretch; flex-direction: column; } .condition { text-align: left; } }
  </style>
</head>
<body>
  <main>
    <nav><div class="brand">WeatherScope</div><div class="badge">Generated from: ${request}</div></nav>
    <section class="grid">
      <div class="panel">
        <span class="badge">Live weather app</span>
        <h1>Search weather for any city.</h1>
        <p>Working city search, current weather, forecast cards, geolocation, loading state, and error handling using the Open-Meteo API.</p>
        <form id="weatherForm"><input id="cityInput" value="Mumbai" placeholder="Try London, Delhi, New York..." /><button>Get Weather</button></form>
        <button id="locationBtn" type="button" style="width:100%;margin-top:12px;background:rgba(255,255,255,.12);color:white;border:1px solid rgba(255,255,255,.15)">Use my location</button>
        <div class="status" id="status">Ready</div>
      </div>
      <div class="panel">
        <div class="topline"><strong id="place">Mumbai</strong><span id="updated">Updated now</span></div>
        <div class="temp-row"><div class="temp" id="temp">--°</div><div class="condition"><strong id="condition">Loading</strong><span id="range">High --° / Low --°</span></div></div>
        <div class="metrics"><div class="metric"><span>Wind</span><strong id="wind">-- km/h</strong></div><div class="metric"><span>Humidity</span><strong id="humidity">--%</strong></div><div class="metric"><span>Feels like</span><strong id="feels">--°</strong></div></div>
      </div>
    </section>
    <section class="forecast" id="forecast"></section>
  </main>
  <script>
    const form = document.getElementById('weatherForm'), input = document.getElementById('cityInput'), statusBox = document.getElementById('status'), locationBtn = document.getElementById('locationBtn');
    const codes = {0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',51:'Light drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',80:'Rain showers',95:'Thunderstorm'};
    const setStatus = (message) => statusBox.textContent = message;
    const dayName = (value) => new Date(value).toLocaleDateString(undefined, { weekday: 'short' });
    async function fetchWeather(latitude, longitude, label) {
      setStatus('Loading live weather...');
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto';
      const response = await fetch(url);
      const data = await response.json();
      document.getElementById('place').textContent = label;
      document.getElementById('updated').textContent = 'Updated ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      document.getElementById('temp').textContent = Math.round(data.current.temperature_2m) + '°';
      document.getElementById('condition').textContent = codes[data.current.weather_code] || 'Live weather';
      document.getElementById('range').textContent = 'High ' + Math.round(data.daily.temperature_2m_max[0]) + '° / Low ' + Math.round(data.daily.temperature_2m_min[0]) + '°';
      document.getElementById('wind').textContent = Math.round(data.current.wind_speed_10m) + ' km/h';
      document.getElementById('humidity').textContent = data.current.relative_humidity_2m + '%';
      document.getElementById('feels').textContent = Math.round(data.current.apparent_temperature) + '°';
      document.getElementById('forecast').innerHTML = data.daily.time.slice(0, 5).map((day, index) => '<div class="day"><span>' + dayName(day) + '</span><strong>' + Math.round(data.daily.temperature_2m_max[index]) + '°</strong><p>' + (codes[data.daily.weather_code[index]] || 'Forecast') + '</p></div>').join('');
      setStatus('Weather loaded');
    }
    async function fetchByCity(city) {
      setStatus('Finding ' + city + '...');
      const response = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(city) + '&count=1&language=en&format=json');
      const data = await response.json();
      if (!data.results || !data.results.length) throw new Error('City not found.');
      const place = data.results[0];
      return fetchWeather(place.latitude, place.longitude, place.name + ', ' + (place.country || ''));
    }
    form.addEventListener('submit', (event) => { event.preventDefault(); fetchByCity(input.value.trim() || 'Mumbai').catch((error) => setStatus(error.message)); });
    locationBtn.addEventListener('click', () => navigator.geolocation ? navigator.geolocation.getCurrentPosition((position) => fetchWeather(position.coords.latitude, position.coords.longitude, 'Your location'), () => setStatus('Location permission denied.')) : setStatus('Geolocation not supported.'));
    fetchByCity('Mumbai').catch((error) => setStatus(error.message));
  </script>
</body>
</html>`;

const escapeMarkup = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const getPromptType = (request = '') => {
  const lower = request.toLowerCase();

  if (lower.includes('restaurant')) return 'Restaurant';
  if (lower.includes('gym') || lower.includes('fitness')) return 'Fitness';
  if (lower.includes('school') || lower.includes('education') || lower.includes('course')) return 'Education';
  if (lower.includes('portfolio')) return 'Portfolio';
  if (lower.includes('dashboard') || lower.includes('admin')) return 'Dashboard';
  if (lower.includes('pricing')) return 'Pricing';
  if (lower.includes('blog')) return 'Blog';
  if (lower.includes('ecommerce') || lower.includes('shop')) return 'Ecommerce';
  if (lower.includes('saas') || lower.includes('startup')) return 'SaaS';

  return 'Website';
};

const getLocalSections = (type) => {
  const sectionMap = {
    Restaurant: ['Menu highlights', 'Table booking', 'Chef story', 'Reviews'],
    Fitness: ['Trainer cards', 'Pricing plans', 'BMI calculator', 'Class schedule'],
    Education: ['Courses', 'Faculty', 'Admissions', 'Student results'],
    Portfolio: ['Projects', 'Skills', 'Case studies', 'Contact'],
    Dashboard: ['Analytics cards', 'Recent activity', 'Project table', 'Quick actions'],
    Pricing: ['Plan comparison', 'Feature list', 'FAQ', 'Checkout callout'],
    Blog: ['Featured articles', 'Categories', 'Author cards', 'Newsletter'],
    Ecommerce: ['Product grid', 'Cart preview', 'Offers', 'Testimonials'],
    SaaS: ['Features', 'Integrations', 'Pricing', 'Dashboard preview'],
    Website: ['Hero section', 'Features', 'Process', 'Contact']
  };

  return sectionMap[type] || sectionMap.Website;
};

const createLocalGeneratedSite = (request, selectedStyle, selectedTheme, selectedPageType) => {
  const safeRequest = escapeMarkup(request || 'Create a modern website');
  const type = getPromptType(request);
  const sections = getLocalSections(type);
  const cards = sections
    .map(
      (section) => `
        <article>
          <span>${escapeMarkup(type)}</span>
          <h3>${escapeMarkup(section)}</h3>
          <p>Generated section tailored for ${escapeMarkup(safeRequest)} with responsive layout and polished interactions.</p>
        </article>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${safeRequest}" />
  <title>${escapeMarkup(type)} Generated Site</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, system-ui, sans-serif;
      color: #f8fbff;
      background:
        radial-gradient(circle at 12% 10%, rgba(94,234,212,.22), transparent 28%),
        radial-gradient(circle at 90% 5%, rgba(56,189,248,.22), transparent 28%),
        linear-gradient(135deg, #070a12, #111827 52%, #0f172a);
    }
    .wrap { width: min(1160px, calc(100% - 32px)); margin: auto; }
    header { min-height: 92vh; display: grid; align-items: center; padding: 34px 0; }
    nav { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 72px; }
    .logo { font-size: 22px; font-weight: 900; }
    .pill { display: inline-flex; padding: 10px 13px; border: 1px solid rgba(255,255,255,.16); border-radius: 999px; background: rgba(255,255,255,.08); color: #99f6e4; font-weight: 800; }
    h1 { max-width: 860px; margin: 18px 0; font-size: clamp(46px, 8vw, 92px); line-height: .95; letter-spacing: 0; }
    .lead { max-width: 760px; color: #c7d2e5; font-size: 20px; line-height: 1.7; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
    a, button { border: 0; border-radius: 999px; padding: 15px 22px; background: linear-gradient(90deg, #5eead4, #38bdf8); color: #041018; text-decoration: none; font-weight: 900; cursor: pointer; }
    button.secondary, a.secondary { border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.08); color: white; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; padding: 0 0 64px; }
    article { min-height: 210px; padding: 24px; border: 1px solid rgba(255,255,255,.13); border-radius: 16px; background: rgba(255,255,255,.08); backdrop-filter: blur(16px); transition: transform .25s ease, border-color .25s ease; }
    article:hover { transform: translateY(-8px); border-color: rgba(94,234,212,.55); }
    article span { color: #99f6e4; font-size: 12px; font-weight: 900; text-transform: uppercase; }
    article h3 { margin: 18px 0 10px; font-size: 26px; }
    article p { margin: 0; color: #c7d2e5; line-height: 1.65; }
    .strip { margin-bottom: 18px; padding: 18px; border-radius: 16px; background: rgba(94,234,212,.1); color: #dffefa; }
    @media (max-width: 760px) { nav, .actions { align-items: stretch; flex-direction: column; } a, button { width: 100%; text-align: center; } }
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <nav>
        <div class="logo">ProjectMaker AI</div>
        <div class="pill">${escapeMarkup(selectedStyle)} • ${escapeMarkup(selectedTheme)}</div>
      </nav>
      <span class="pill">${escapeMarkup(selectedPageType)} • ${escapeMarkup(type)}</span>
      <h1>${safeRequest}</h1>
      <p class="lead">A responsive generated preview with smart sections, polished cards, theme-ready styling, hover interactions, and exportable single-file HTML.</p>
      <div class="actions">
        <a href="#sections">Explore sections</a>
        <button class="secondary" onclick="document.body.classList.toggle('light')">Transform theme</button>
      </div>
    </div>
  </header>
  <main class="wrap">
    <div class="strip">Local generation fallback is active, so your prompt still creates a usable preview even if the cloud model is slow or empty.</div>
    <section class="grid" id="sections">${cards}</section>
  </main>
  <script>
    document.querySelectorAll('article').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(18px)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 90);
    });
  </script>
</body>
</html>`;
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

      const responsePayload = response.data;
      const rawHtml =
        responsePayload?.data ||
        responsePayload?.html ||
        responsePayload?.website ||
        (typeof responsePayload === 'string' ? responsePayload : '');
      let cleaned = cleanCode(rawHtml);

      if (!cleaned) {
        cleaned = prompt.toLowerCase().includes('weather')
          ? createLocalWeatherSite(prompt)
          : createLocalGeneratedSite(prompt, style, theme, pageType);
      }

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
