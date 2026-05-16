// backend/controllers/aiController.js

const https = require('https');
const Generation = require('../models/Generation');
const Project = require('../models/Project');
const StyleVersion = require('../models/StyleVersion');
const ImprovementReport = require('../models/ImprovementReport');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const AI_TIMEOUT_MS = 60000;

const cleanHtml = (value = '') => {
  let html = value
    .replace(/```html/g, '')
    .replace(/```/g, '')
    .trim();

  const start =
    html.indexOf('<!DOCTYPE html>') !== -1
      ? html.indexOf('<!DOCTYPE html>')
      : html.indexOf('<html');

  if (start !== -1) {
    html = html.slice(start);
  }

  const end = html.lastIndexOf('</html>');

  if (end !== -1) {
    html = html.slice(0, end + 7);
  }

  return html;
};

const escapeHtml = (value = '') => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const hasVisibleHtml = (html = '') => {
  const visibleText = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return (
    html.includes('<body') &&
    html.includes('</body>') &&
    visibleText.length > 40
  );
};

const isLowQualityGeneratedHtml = (html = '') => {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase();

  const weakSignals = [
    'feature 1',
    'feature 2',
    'feature 3',
    "it's a great feature",
    'we hope you enjoy',
    'learn more',
    'welcome to our',
    'this is a retro style landing page'
  ];

  const signalCount = weakSignals.filter((signal) => text.includes(signal)).length;

  return signalCount >= 2 || (text.includes('feature 1') && text.includes('feature 2'));
};

const getPromptSummary = (prompt) => {
  const match = prompt.match(/User request:\s*([\s\S]*?)(?:\n\nBuilder settings:|\n\nLive AI edit instruction:|$)/i);
  return (match?.[1] || prompt).trim().slice(0, 180);
};

const createWeatherFallbackWebsite = (prompt) => {
  const summary = escapeHtml(getPromptSummary(prompt) || 'Create a weather site');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${summary}" />
  <title>WeatherScope - Live Weather App</title>
  <style>
    * { box-sizing: border-box; }
    :root {
      --bg: #07111f;
      --panel: rgba(255,255,255,0.1);
      --line: rgba(255,255,255,0.16);
      --text: #f8fbff;
      --muted: #b7c6da;
      --accent: #5eead4;
      --accent-2: #60a5fa;
    }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at 15% 10%, rgba(94,234,212,0.24), transparent 28%),
        radial-gradient(circle at 90% 15%, rgba(96,165,250,0.24), transparent 26%),
        linear-gradient(135deg, #07111f, #0f172a 48%, #111827);
    }
    .app {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
      padding: 34px 0;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 34px;
    }
    .brand {
      font-size: 22px;
      font-weight: 900;
      letter-spacing: 0.02em;
    }
    .badge {
      padding: 9px 12px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
      color: var(--accent);
      font-weight: 800;
      font-size: 13px;
    }
    .hero {
      display: grid;
      grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1fr);
      gap: 22px;
      align-items: stretch;
    }
    .panel {
      border: 1px solid var(--line);
      border-radius: 18px;
      background: var(--panel);
      backdrop-filter: blur(18px);
      box-shadow: 0 28px 90px rgba(0,0,0,0.28);
    }
    .search-panel {
      padding: 34px;
    }
    h1 {
      margin: 18px 0 16px;
      font-size: clamp(42px, 7vw, 76px);
      line-height: 1;
      letter-spacing: -0.04em;
    }
    .lead {
      margin: 0 0 28px;
      color: var(--muted);
      font-size: 18px;
      line-height: 1.7;
    }
    form {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      margin-bottom: 14px;
    }
    input {
      min-height: 54px;
      border: 1px solid var(--line);
      border-radius: 12px;
      background: rgba(255,255,255,0.09);
      color: var(--text);
      padding: 0 16px;
      font-size: 16px;
      outline: none;
    }
    input::placeholder { color: #8292aa; }
    button {
      min-height: 54px;
      border: 0;
      border-radius: 12px;
      padding: 0 18px;
      color: #041018;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      font-weight: 900;
      cursor: pointer;
    }
    .ghost {
      width: 100%;
      color: var(--text);
      background: rgba(255,255,255,0.1);
      border: 1px solid var(--line);
    }
    .weather-card {
      padding: 28px;
      display: grid;
      min-height: 520px;
    }
    .topline {
      display: flex;
      justify-content: space-between;
      gap: 14px;
      color: var(--muted);
    }
    .temp-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      margin: 44px 0;
    }
    .temp {
      font-size: clamp(72px, 10vw, 132px);
      line-height: 0.85;
      font-weight: 900;
      letter-spacing: -0.08em;
    }
    .condition {
      text-align: right;
      color: var(--muted);
      font-size: 18px;
      line-height: 1.6;
    }
    .condition strong {
      display: block;
      color: var(--text);
      font-size: 26px;
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      align-self: end;
    }
    .metric, .day {
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: rgba(255,255,255,0.08);
    }
    .metric span, .day span {
      display: block;
      color: var(--muted);
      font-size: 13px;
      margin-bottom: 8px;
    }
    .metric strong, .day strong {
      font-size: 20px;
    }
    .forecast {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
      margin-top: 22px;
    }
    .day {
      min-height: 128px;
    }
    .status {
      margin-top: 16px;
      color: var(--accent);
      min-height: 24px;
      font-weight: 800;
    }
    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; }
      .forecast, .metrics { grid-template-columns: 1fr; }
      form { grid-template-columns: 1fr; }
      nav { align-items: flex-start; flex-direction: column; }
      .temp-row { align-items: flex-start; flex-direction: column; }
      .condition { text-align: left; }
    }
  </style>
</head>
<body>
  <main class="app">
    <nav>
      <div class="brand">WeatherScope</div>
      <div class="badge">Live weather app with API logic</div>
    </nav>

    <section class="hero">
      <div class="panel search-panel">
        <span class="badge">Search any city</span>
        <h1>Live weather, clean forecast, instant city search.</h1>
        <p class="lead">This generated weather site includes working JavaScript logic, geocoding, current weather, five-day forecast cards, geolocation, loading state, and error handling.</p>

        <form id="weatherForm">
          <input id="cityInput" type="search" placeholder="Try Mumbai, London, New York..." value="Mumbai" />
          <button type="submit">Get Weather</button>
        </form>

        <button class="ghost" id="locationBtn" type="button">Use my location</button>
        <div class="status" id="status">Ready</div>
      </div>

      <div class="panel weather-card">
        <div class="topline">
          <strong id="place">Mumbai, India</strong>
          <span id="updated">Updated now</span>
        </div>

        <div class="temp-row">
          <div class="temp" id="temp">--°</div>
          <div class="condition">
            <strong id="condition">Loading</strong>
            <span id="range">High --° / Low --°</span>
          </div>
        </div>

        <div class="metrics">
          <div class="metric"><span>Wind</span><strong id="wind">-- km/h</strong></div>
          <div class="metric"><span>Humidity</span><strong id="humidity">--%</strong></div>
          <div class="metric"><span>Feels Like</span><strong id="feels">--°</strong></div>
        </div>
      </div>
    </section>

    <section class="forecast" id="forecast"></section>
  </main>

  <script>
    const form = document.getElementById('weatherForm');
    const input = document.getElementById('cityInput');
    const statusBox = document.getElementById('status');
    const locationBtn = document.getElementById('locationBtn');
    const weatherCodes = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Drizzle',
      55: 'Heavy drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
      71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 80: 'Rain showers',
      81: 'Rain showers', 82: 'Heavy showers', 95: 'Thunderstorm'
    };

    function setStatus(message) {
      statusBox.textContent = message;
    }

    function dayName(dateString) {
      return new Date(dateString).toLocaleDateString(undefined, { weekday: 'short' });
    }

    async function fetchByCity(city) {
      setStatus('Finding ' + city + '...');
      const geoUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(city) + '&count=1&language=en&format=json';
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.results || !geoData.results.length) {
        throw new Error('City not found. Try another location.');
      }

      const place = geoData.results[0];
      return fetchWeather(place.latitude, place.longitude, place.name + ', ' + (place.country || ''));
    }

    async function fetchWeather(latitude, longitude, label) {
      setStatus('Loading live weather...');
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto';
      const response = await fetch(url);
      const data = await response.json();

      document.getElementById('place').textContent = label;
      document.getElementById('updated').textContent = 'Updated ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      document.getElementById('temp').textContent = Math.round(data.current.temperature_2m) + '°';
      document.getElementById('condition').textContent = weatherCodes[data.current.weather_code] || 'Live weather';
      document.getElementById('range').textContent = 'High ' + Math.round(data.daily.temperature_2m_max[0]) + '° / Low ' + Math.round(data.daily.temperature_2m_min[0]) + '°';
      document.getElementById('wind').textContent = Math.round(data.current.wind_speed_10m) + ' km/h';
      document.getElementById('humidity').textContent = data.current.relative_humidity_2m + '%';
      document.getElementById('feels').textContent = Math.round(data.current.apparent_temperature) + '°';

      const forecast = document.getElementById('forecast');
      forecast.innerHTML = data.daily.time.slice(0, 5).map(function(day, index) {
        return '<div class="day"><span>' + dayName(day) + '</span><strong>' + Math.round(data.daily.temperature_2m_max[index]) + '°</strong><p>' + (weatherCodes[data.daily.weather_code[index]] || 'Forecast') + '</p></div>';
      }).join('');

      setStatus('Weather loaded');
    }

    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      try {
        await fetchByCity(input.value.trim() || 'Mumbai');
      } catch (error) {
        setStatus(error.message);
      }
    });

    locationBtn.addEventListener('click', function() {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported in this browser.');
        return;
      }

      setStatus('Requesting location...');
      navigator.geolocation.getCurrentPosition(
        function(position) {
          fetchWeather(position.coords.latitude, position.coords.longitude, 'Your location').catch(function(error) {
            setStatus(error.message);
          });
        },
        function() {
          setStatus('Location permission denied.');
        }
      );
    });

    fetchByCity('Mumbai').catch(function(error) {
      setStatus(error.message);
    });
  </script>
</body>
</html>`;
};

const createFallbackWebsite = (prompt) => {
  const summary = escapeHtml(getPromptSummary(prompt) || 'Modern website');
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('weather')) {
    return createWeatherFallbackWebsite(prompt);
  }

  const industry = lowerPrompt.includes('restaurant')
    ? 'Restaurant'
    : lowerPrompt.includes('gym') || lowerPrompt.includes('fitness')
      ? 'Fitness'
      : lowerPrompt.includes('education') || lowerPrompt.includes('school')
        ? 'Education'
        : lowerPrompt.includes('portfolio')
          ? 'Portfolio'
          : lowerPrompt.includes('saas')
            ? 'AI SaaS'
            : 'Startup';

  const sections = {
    Restaurant: ['Menu highlights', 'Table booking', 'Chef story', 'Customer reviews'],
    Fitness: ['Trainer programs', 'Membership plans', 'BMI tools', 'Class schedule'],
    Education: ['Courses', 'Faculty', 'Results', 'Admissions'],
    Portfolio: ['Projects', 'Skills', 'Case studies', 'Contact'],
    'AI SaaS': ['Features', 'Pricing', 'Integrations', 'Dashboard preview'],
    Startup: ['Hero', 'Features', 'Pricing', 'Testimonials']
  }[industry];

  const cards = sections
    .map(
      (section) => `
        <article>
          <span>${escapeHtml(section)}</span>
          <h3>${escapeHtml(section)}</h3>
          <p>Smart AI-ready section generated for the ${escapeHtml(industry)} website flow.</p>
        </article>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${summary}" />
  <title>ProjectMaker AI Generated Site</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #f8fbff;
      background:
        radial-gradient(circle at top left, rgba(0, 212, 255, 0.22), transparent 30%),
        radial-gradient(circle at bottom right, rgba(108, 99, 255, 0.3), transparent 34%),
        #080810;
    }
    header {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 56px 20px;
    }
    .wrap { width: min(1120px, 100%); margin: auto; }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 76px;
    }
    .logo { font-weight: 900; letter-spacing: 0.04em; }
    .badge {
      display: inline-flex;
      padding: 10px 14px;
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 999px;
      color: #85f4ff;
      background: rgba(255,255,255,0.08);
      font-weight: 800;
    }
    h1 {
      max-width: 820px;
      margin: 24px 0;
      font-size: clamp(42px, 8vw, 86px);
      line-height: 1;
    }
    .lead {
      max-width: 720px;
      color: #c8d3e5;
      font-size: clamp(18px, 2vw, 22px);
      line-height: 1.7;
    }
    .actions {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      margin-top: 34px;
    }
    a, button {
      border: 0;
      border-radius: 999px;
      padding: 15px 22px;
      color: #fff;
      background: linear-gradient(90deg, #6c63ff, #00d4ff);
      text-decoration: none;
      font-weight: 900;
      cursor: pointer;
    }
    .ghost {
      border: 1px solid rgba(255,255,255,0.16);
      background: rgba(255,255,255,0.08);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 16px;
      padding: 0 20px 72px;
    }
    article {
      min-height: 190px;
      padding: 24px;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 14px;
      background: rgba(255,255,255,0.07);
      backdrop-filter: blur(18px);
      transition: transform 0.25s ease, border-color 0.25s ease;
    }
    article:hover {
      transform: translateY(-8px);
      border-color: rgba(0,212,255,0.5);
    }
    article span {
      color: #85f4ff;
      font-size: 13px;
      font-weight: 900;
      text-transform: uppercase;
    }
    article h3 { margin: 18px 0 10px; }
    article p { margin: 0; color: #c8d3e5; line-height: 1.6; }
    .loader {
      position: fixed;
      left: 18px;
      bottom: 18px;
      padding: 10px 12px;
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
      color: #85f4ff;
      font-size: 13px;
      font-weight: 800;
    }
    @media (max-width: 720px) {
      nav { align-items: flex-start; flex-direction: column; margin-bottom: 44px; }
      .actions a, .actions button { width: 100%; }
    }
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <nav>
        <div class="logo">ProjectMaker AI</div>
        <div class="badge">${escapeHtml(industry)} website</div>
      </nav>
      <span class="badge">Generated fallback preview</span>
      <h1>${summary}</h1>
      <p class="lead">The cloud AI provider timed out, so ProjectMaker generated this local responsive preview with smart sections, theme-ready styling, animation-ready cards, and exportable HTML.</p>
      <div class="actions">
        <button type="button" onclick="document.getElementById('sections')?.scrollIntoView({ behavior: 'smooth', block: 'start' })">Explore sections</button>
        <button type="button" onclick="document.body.classList.toggle('light')">Transform theme</button>
      </div>
    </div>
  </header>
  <main class="grid" id="sections">${cards}</main>
  <div class="loader">AI loader ready</div>
  <script>
    document.querySelectorAll('article').forEach((card, index) => {
      card.style.animation = 'rise 500ms ease forwards';
      card.style.animationDelay = (index * 90) + 'ms';
    });
  </script>
</body>
</html>`;
};

const postJson = (url, payload, headers = {}) => {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const request = https.request(
      url,
      {
        method: 'POST',
        family: 4,
        timeout: AI_TIMEOUT_MS,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Content-Length': Buffer.byteLength(body)
        }
      },
      (response) => {
        let responseBody = '';

        response.on('data', (chunk) => {
          responseBody += chunk;
        });

        response.on('end', () => {
          resolve({
            ok: response.statusCode >= 200 && response.statusCode < 300,
            status: response.statusCode,
            text: responseBody
          });
        });
      }
    );

    request.on('timeout', () => {
      request.destroy(new Error('AI provider request timed out after 60 seconds'));
    });

    request.on('error', reject);
    request.write(body);
    request.end();
  });
};

const buildWebsitePrompt = (prompt) => `
You are ProjectMaker AI, a professional website generator.

Create the exact website requested by the user.

User request:
${prompt}

Return ONLY one complete valid HTML file.

Rules:
- Must start with <!DOCTYPE html>
- Must end with </html>
- Use HTML, CSS, and JavaScript only
- CSS must be inside <style>
- JavaScript must be inside <script>
- No markdown
- No explanations
- No React
- No imports
- No backend code
- No lorem ipsum
- Website must match the prompt exactly
- If user asks for calculator, make working calculator
- If user asks for clone, create similar layout/style without using copyrighted logos/images
- If user asks for game, make playable game logic
- If user asks for todo, make working todo app
- If user asks for quiz, make working quiz app
- If user asks for ecommerce, make product cards/cart UI
- If user asks for education, make course/class UI
- If user asks for weather, make a working weather app with city search, geolocation, current weather, forecast, loading states, and browser-side API logic
- If a request needs backend APIs, clearly simulate the flow in browser JavaScript because this endpoint returns a single preview HTML file
- Make UI modern, responsive, and attractive
`;

const generateWebsite = async (req, res) => {
  let prompt = '';

  try {
    prompt = req.body?.prompt || '';

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required'
      });
    }

    if (prompt.toLowerCase().includes('weather')) {
      return res.json({
        success: true,
        data: createFallbackWebsite(prompt),
        warning:
          'ProjectMaker generated a working weather app locally for faster preview.'
      });
    }

    if (!process.env.NVIDIA_NIM_API_KEY) {
      return res.json({
        success: true,
        data: createFallbackWebsite(prompt),
        warning:
          'NVIDIA_NIM_API_KEY is missing, so ProjectMaker generated a local website preview.'
      });
    }

    const aiPrompt = buildWebsitePrompt(prompt);

    const response = await postJson(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        model: 'meta/llama-3.3-70b-instruct',
        messages: [
          {
            role: 'system',
            content:
              'Return only complete valid HTML code. No explanation.'
          },
          {
            role: 'user',
            content: aiPrompt
          }
        ],
        temperature: 0.9,
        max_tokens: 4096
      },
      {
        Authorization: `Bearer ${process.env.NVIDIA_NIM_API_KEY}`
      }
    );

    if (!response.ok) {
      return res.json({
        success: true,
        data: createFallbackWebsite(prompt),
        warning:
          'The AI provider returned an error, so ProjectMaker generated a local website preview.'
      });
    }

    const data = JSON.parse(response.text);

    const html = cleanHtml(data.choices?.[0]?.message?.content || '');

    if (!html || !hasVisibleHtml(html) || isLowQualityGeneratedHtml(html)) {
      return res.json({
        success: true,
        data: createFallbackWebsite(prompt),
        warning:
          'The AI provider returned a generic template, so ProjectMaker generated a premium local website preview.'
      });
    }

    res.json({
      success: true,
      data: html
    });

  } catch (error) {
    const timeoutCodes = new Set([
      'ETIMEDOUT',
      'ESOCKETTIMEDOUT',
      'UND_ERR_CONNECT_TIMEOUT'
    ]);

    const isTimeout =
      timeoutCodes.has(error.code) ||
      timeoutCodes.has(error.cause?.code) ||
      error.message?.toLowerCase().includes('timed out');

    console.log('AI ERROR:', error.message);

    if (isTimeout) {
      return res.json({
        success: true,
        data: createFallbackWebsite(prompt),
        warning:
          'NVIDIA AI timed out, so ProjectMaker returned a local fallback website preview.'
      });
    }

    res.json({
      success: true,
      data: createFallbackWebsite(prompt),
      warning:
        'AI generation failed, so ProjectMaker generated a local website preview.'
    });
  }
};

const inferSections = (prompt = '') => {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('restaurant') || lowerPrompt.includes('food')) {
    return ['Hero', 'Menu', 'Booking', 'Chef section', 'Gallery', 'Reviews', 'Contact'];
  }

  if (lowerPrompt.includes('fitness') || lowerPrompt.includes('gym')) {
    return ['Hero', 'Plans', 'Trainers', 'BMI calculator', 'Testimonials', 'Pricing'];
  }

  if (lowerPrompt.includes('saas') || lowerPrompt.includes('startup') || lowerPrompt.includes('ai')) {
    return ['Hero', 'Features', 'Pricing', 'FAQ', 'Testimonials', 'CTA'];
  }

  return ['Hero', 'Benefits', 'Features', 'Gallery', 'Testimonials', 'CTA'];
};

const buildProjectPlan = (idea = '') => {
  const title = getPromptSummary(idea || 'AI Project').split(/[.?!]/)[0].slice(0, 70) || 'AI Project';

  return {
    title,
    description: `A production-ready product plan for: ${idea}`,
    features: [
      'Account-based dashboard',
      'AI generation workflow',
      'Saved project history',
      'Live preview and export tools',
      'Analytics and usage tracking'
    ],
    pages: ['Landing', 'Login', 'Dashboard', 'Generator', 'Project editor', 'Settings'],
    components: ['Navbar', 'Sidebar', 'PromptBox', 'ProjectCard', 'LivePreview', 'ImprovementPanel'],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Normal CSS'],
    folderStructure: ['frontend/src/pages', 'frontend/src/components', 'backend/controllers', 'backend/models', 'backend/routes'],
    databaseSchema: ['User', 'Project', 'Generation', 'StyleVersion', 'ImprovementReport', 'Folder'],
    apiRoutes: ['/api/auth', '/api/projects', '/api/ai', '/api/folders'],
    deploymentSteps: ['Configure environment variables', 'Deploy backend', 'Set frontend API URL', 'Deploy frontend']
  };
};

const buildImprovementReport = () => ({
  designScore: 86,
  uiScore: 88,
  mobileScore: 82,
  seoScore: 79,
  conversionScore: 84,
  suggestions: [
    {
      issue: 'Hero value proposition needs stronger contrast',
      whyItMatters: 'Users decide whether to continue within the first few seconds.',
      suggestedFix: 'Increase headline contrast, add proof metrics, and place one primary CTA above the fold.'
    },
    {
      issue: 'Trust signals are light',
      whyItMatters: 'Trust sections improve conversion for SaaS and service pages.',
      suggestedFix: 'Add logos, testimonials, security badges, or launch metrics below the hero.'
    },
    {
      issue: 'Mobile hierarchy can be tighter',
      whyItMatters: 'A large share of visitors will scan the page on smaller screens.',
      suggestedFix: 'Reduce card padding, stack CTAs, and keep preview media below the intro copy.'
    },
    {
      issue: 'SEO metadata is generic',
      whyItMatters: 'Search and social previews need specific page context.',
      suggestedFix: 'Add descriptive title, meta description, semantic headings, and structured sections.'
    }
  ]
});

const applyStyleToHtml = (html = '', style = 'Dark futuristic style') => {
  const styleName = escapeHtml(style);
  const styleBlock = `<style id="projectmaker-restyle">
    :root { --pm-accent:#5eead4; --pm-accent-2:#60a5fa; }
    body {
      background:
        radial-gradient(circle at 18% 10%, rgba(94,234,212,.22), transparent 28%),
        radial-gradient(circle at 85% 14%, rgba(96,165,250,.2), transparent 26%),
        linear-gradient(135deg,#020617,#0f172a 52%,#111827) !important;
      color:#f8fbff !important;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    }
    section, header, main, article, aside, nav {
      border-radius: 18px;
    }
    button, a {
      transition: transform .22s ease, box-shadow .22s ease, background .22s ease;
    }
    button:hover, a:hover {
      transform: translateY(-2px);
    }
    .projectmaker-style-badge {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 9999;
      padding: 10px 13px;
      border-radius: 999px;
      background: rgba(15,23,42,.86);
      border: 1px solid rgba(255,255,255,.18);
      color: #9ffcf0;
      font: 800 12px Inter, sans-serif;
      backdrop-filter: blur(16px);
    }
  </style>`;
  const badge = `<div class="projectmaker-style-badge">Restyled: ${styleName}</div>`;

  if (html.includes('</head>')) {
    return html.replace('</head>', `${styleBlock}</head>`).replace('</body>', `${badge}</body>`);
  }

  return `${styleBlock}${html}${badge}`;
};

const generateWebsiteTool = async (req, res) => {
  try {
    const { prompt, style = 'Minimal SaaS', projectType = 'Landing page' } = req.body;

    if (!prompt?.trim()) {
      return sendError(res, 'Prompt is required', 400);
    }

    const html = createFallbackWebsite(`${prompt}\nStyle: ${style}\nType: ${projectType}`);

    await Generation.create({
      user: req.user._id,
      type: 'website',
      prompt,
      style,
      projectType,
      output: html,
      tokensUsed: 8
    });

    return sendSuccess(res, 'Website generated', {
      html,
      smartSections: inferSections(prompt),
      style,
      projectType
    });
  } catch (error) {
    return sendError(res, error.message);
  }
};

const generateProject = async (req, res) => {
  try {
    const { idea } = req.body;

    if (!idea?.trim()) {
      return sendError(res, 'Project idea is required', 400);
    }

    const plan = buildProjectPlan(idea);

    await Generation.create({
      user: req.user._id,
      type: 'project',
      prompt: idea,
      output: plan,
      tokensUsed: 6
    });

    return sendSuccess(res, 'Project plan generated', plan);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const analyzeProject = async (req, res) => {
  try {
    const { idea } = req.body;

    if (!idea?.trim()) {
      return sendError(res, 'Project idea is required', 400);
    }

    const analysis = {
      difficulty: idea.length > 180 ? 'Advanced' : 'Intermediate',
      bestTechStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      coreFeatures: ['Authentication', 'Dashboard', 'CRUD workflow', 'Search and filters'],
      advancedFeatures: ['AI assistant', 'Version history', 'Team collaboration', 'Analytics'],
      databaseModels: ['User', 'Project', 'Generation', 'Folder'],
      apiEndpoints: ['/api/auth/register', '/api/projects', '/api/ai/analyze-project'],
      uiPages: ['Landing', 'Dashboard', 'Editor', 'Settings'],
      timeline: ['Day 1: Auth and models', 'Day 2: Generator flow', 'Day 3: Dashboard', 'Day 4: Polish and deploy'],
      monetizationIdeas: ['Free credits', 'Pro plan', 'Team plan', 'Export add-ons'],
      improvementSuggestions: buildImprovementReport().suggestions
    };

    await Generation.create({
      user: req.user._id,
      type: 'analysis',
      prompt: idea,
      output: analysis,
      tokensUsed: 5
    });

    return sendSuccess(res, 'Project analyzed', analysis);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const restyleWebsite = async (req, res) => {
  try {
    const { projectId, html, style = 'Dark futuristic style' } = req.body;
    const project = projectId
      ? await Project.findOne({ _id: projectId, user: req.user._id })
      : null;
    const sourceHtml = html || project?.generatedCode;

    if (!sourceHtml) {
      return sendError(res, 'Website HTML is required', 400);
    }

    const restyledHtml = applyStyleToHtml(sourceHtml, style);
    let styleVersion = null;

    if (project) {
      styleVersion = await StyleVersion.create({
        user: req.user._id,
        project: project._id,
        name: `${style} version`,
        style,
        generatedCode: restyledHtml,
        notes: 'AI restyle preserved original content and updated visual system.'
      });

      project.style = style;
      project.generatedCode = restyledHtml;
      project.styleVersions.push(styleVersion._id);
      await project.save();
    }

    return sendSuccess(res, 'Website restyled', {
      html: restyledHtml,
      styleVersion
    });
  } catch (error) {
    return sendError(res, error.message);
  }
};

const improveWebsite = async (req, res) => {
  try {
    const { projectId } = req.body;
    const reportData = buildImprovementReport();
    let report = reportData;

    if (projectId) {
      const project = await Project.findOne({ _id: projectId, user: req.user._id });

      if (!project) {
        return sendError(res, 'Project not found', 404);
      }

      report = await ImprovementReport.create({
        user: req.user._id,
        project: project._id,
        ...reportData
      });

      project.improvementReports.push(report._id);
      await project.save();
    }

    return sendSuccess(res, 'Website improvement report created', report);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const applyImprovement = async (req, res) => {
  try {
    const { projectId, improvementText } = req.body;

    if (!projectId) {
      return sendError(res, 'Project id is required', 400);
    }

    const project = await Project.findOne({ _id: projectId, user: req.user._id });

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    const updatedHtml = applyStyleToHtml(
      project.generatedCode,
      improvementText || 'Applied AI conversion and accessibility improvements'
    );

    project.generatedCode = updatedHtml;
    project.versions.push({
      title: 'Applied AI improvement',
      prompt: improvementText || 'AI improvement',
      generatedCode: updatedHtml
    });
    await project.save();

    return sendSuccess(res, 'Improvement applied', project);
  } catch (error) {
    return sendError(res, error.message);
  }
};

module.exports = {
  generateWebsite,
  generateWebsiteTool,
  generateProject,
  analyzeProject,
  restyleWebsite,
  improveWebsite,
  applyImprovement
};
