// src/pages/GeneratorPage.jsx

import { useMemo, useRef, useState } from 'react';
import api from '../services/api';
import { createProject } from '../services/projectService';
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

const getProjectTitle = (request, fallback = 'AI Generated Website') => {
  const cleanRequest = request.replace(/\s+/g, ' ').trim();

  if (!cleanRequest) {
    return fallback;
  }

  return cleanRequest
    .split(' ')
    .slice(0, 6)
    .join(' ')
    .replace(/[^\w\s-]/g, '') || fallback;
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

const getPromptType = (request = '') => {
  const lower = request.toLowerCase();

  if (lower.includes('restaurant')) return 'Restaurant';
  if (lower.includes('gym') || lower.includes('fitness')) return 'Fitness';
  if (
    lower.includes('school') ||
    lower.includes('education') ||
    lower.includes('course') ||
    lower.includes('study') ||
    lower.includes('tutor') ||
    lower.includes('student') ||
    lower.includes('learning')
  ) return 'Education';
  if (lower.includes('portfolio')) return 'Portfolio';
  if (lower.includes('dashboard') || lower.includes('admin')) return 'Dashboard';
  if (lower.includes('pricing')) return 'Pricing';
  if (lower.includes('blog')) return 'Blog';
  if (lower.includes('ecommerce') || lower.includes('shop')) return 'Ecommerce';
  if (lower.includes('saas') || lower.includes('startup')) return 'SaaS';

  return 'Website';
};

const resolveGenerationType = (request = '', selectedIndustry = 'Auto detect', selectedPageType = 'Landing page') => {
  if (selectedPageType === 'Dashboard' || selectedPageType === 'Admin panel') return 'Dashboard';
  if (selectedPageType === 'Pricing page') return 'Pricing';
  if (selectedPageType === 'Blog page') return 'Blog';

  const industryMap = {
    Gym: 'Fitness',
    Restaurant: 'Restaurant',
    'AI SaaS': 'SaaS',
    Education: 'Education',
    Portfolio: 'Portfolio'
  };

  return industryMap[selectedIndustry] || getPromptType(request);
};

const humanizePromptTitle = (request = '', type = 'Website', selectedPageType = 'Landing page') => {
  const cleaned = request
    .toLowerCase()
    .replace(/\b(create|make|build|generate|design|develop|give me|please)\b/g, '')
    .replace(/\b(a|an|the|website|web site|site|page|landing page|app)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const lower = request.toLowerCase();

  if (type === 'Education' && (lower.includes('study') || lower.includes('ai'))) {
    return 'StudyAI Learning Platform';
  }

  if (type === 'Restaurant') return cleaned ? `${toTitleCase(cleaned)} Dining Experience` : 'Premium Restaurant Experience';
  if (type === 'Fitness') return cleaned ? `${toTitleCase(cleaned)} Fitness Studio` : 'Performance Fitness Studio';
  if (type === 'Portfolio') return cleaned ? `${toTitleCase(cleaned)} Portfolio` : 'Creative Portfolio Studio';
  if (type === 'Dashboard') return cleaned ? `${toTitleCase(cleaned)} Dashboard` : 'Command Center Dashboard';
  if (type === 'Pricing') return cleaned ? `${toTitleCase(cleaned)} Pricing` : 'Conversion Pricing Page';
  if (type === 'Blog') return cleaned ? `${toTitleCase(cleaned)} Journal` : 'Editorial Blog Platform';
  if (type === 'Ecommerce') return cleaned ? `${toTitleCase(cleaned)} Store` : 'Premium Commerce Store';
  if (type === 'SaaS') return cleaned ? `${toTitleCase(cleaned)} Platform` : 'AI SaaS Platform';

  return cleaned ? `${toTitleCase(cleaned)} ${selectedPageType.replace(' page', '')}` : 'Premium Generated Website';
};

const toTitleCase = (value = '') =>
  value.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));

const getLocalSections = (type, selectedPageType = 'Landing page') => {
  if (selectedPageType === 'Login page') {
    return ['Sign-in panel', 'Social login', 'Password recovery', 'Trust badges'];
  }

  const sectionMap = {
    Restaurant: ['Signature menu', 'Instant reservation', 'Chef story', 'Guest reviews'],
    Fitness: ['Trainer programs', 'Plan comparison', 'BMI calculator', 'Class schedule'],
    Education: ['AI tutor', 'Smart flashcards', 'Quiz generator', 'Notes summarizer'],
    Portfolio: ['Selected work', 'Skill stack', 'Case studies', 'Contact studio'],
    Dashboard: ['Live analytics', 'Activity stream', 'Project table', 'Quick actions'],
    Pricing: ['Plan comparison', 'Value proof', 'FAQ', 'Checkout callout'],
    Blog: ['Featured articles', 'Topic library', 'Author cards', 'Newsletter'],
    Ecommerce: ['Product showcase', 'Cart preview', 'Limited offers', 'Social proof'],
    SaaS: ['AI features', 'Integrations', 'Pricing', 'Product dashboard'],
    Website: ['Hero section', 'Feature system', 'Process flow', 'Conversion CTA']
  };

  return sectionMap[type] || sectionMap.Website;
};

const getCommandIntent = (request = '') => {
  const lower = request.toLowerCase();
  const colorMatches = [
    'purple',
    'blue',
    'green',
    'red',
    'pink',
    'orange',
    'yellow',
    'black',
    'white'
  ];
  const requestedColor = colorMatches.find((color) => lower.includes(color));

  return {
    transparentNav: lower.includes('transparent navbar') || lower.includes('navbar transparent'),
    pricing: lower.includes('pricing') || lower.includes('plans'),
    contact: lower.includes('contact'),
    animations: lower.includes('animation') || lower.includes('animated'),
    dashboard: lower.includes('dashboard'),
    login: lower.includes('login') || lower.includes('sign in'),
    requestedColor
  };
};

const getColorOverride = (color) => {
  const colors = {
    purple: ['#a855f7', '#22d3ee'],
    blue: ['#2563eb', '#38bdf8'],
    green: ['#22c55e', '#5eead4'],
    red: ['#ef4444', '#fb7185'],
    pink: ['#ec4899', '#f0abfc'],
    orange: ['#f97316', '#facc15'],
    yellow: ['#facc15', '#fb923c'],
    black: ['#ffffff', '#a1a1aa'],
    white: ['#2563eb', '#14b8a6']
  };

  return colors[color];
};

const getPremiumHeroCopy = (type) => {
  const copy = {
    Restaurant:
      'A polished restaurant experience with reservation flow, curated menu storytelling, trust-building reviews, and a premium dining feel.',
    Fitness:
      'A high-conversion fitness website with trainer credibility, membership plans, progress tools, and mobile-ready class discovery.',
    Education:
      'A premium learning platform concept with AI study tools, smart revision workflows, student dashboards, and conversion-ready course sections.',
    Portfolio:
      'A refined portfolio presence that frames your work as case studies, highlights your strengths, and guides visitors toward contact.',
    Dashboard:
      'A sharp dashboard interface with clear metrics, fast actions, project status, and activity summaries designed for repeat daily use.',
    Pricing:
      'A pricing page that makes plan comparison easy, explains value clearly, and moves visitors toward confident checkout decisions.',
    Blog:
      'An editorial experience with featured posts, topic discovery, author credibility, and a newsletter path for audience growth.',
    Ecommerce:
      'A commerce-ready storefront with product storytelling, offers, cart flow, and trust signals that make browsing feel premium.',
    SaaS:
      'A startup-ready SaaS page with product narrative, feature depth, integrations, pricing, and a dashboard-style proof point.',
    Website:
      'A responsive premium website preview with strong hierarchy, polished motion-ready sections, and exportable single-file code.'
  };

  return copy[type] || copy.Website;
};

const getPremiumSectionCopy = (type, section) => {
  const copy = {
    'AI tutor':
      'Personalized learning guidance, instant explanations, and focused next-step recommendations for every student.',
    'Smart flashcards':
      'Auto-organized revision cards with mastery states, streak cues, and quick recall practice.',
    'Quiz generator':
      'Interactive assessments with difficulty modes, score feedback, and topic-based practice.',
    'Notes summarizer':
      'Clean study summaries, key takeaways, and revision prompts from long lesson content.',
    'Trainer programs':
      'Credible coach profiles with goals, intensity levels, and program outcomes.',
    'Plan comparison':
      'Clear tiering, feature contrast, and confident upgrade paths for every visitor.',
    'Product dashboard':
      'A visual proof point that makes the product feel real, operational, and ready to use.'
  };

  return (
    copy[section] ||
    `${section} designed for a premium ${type.toLowerCase()} experience with clear hierarchy, strong calls to action, and responsive polish.`
  );
};

const getPremiumMetrics = (type) => {
  const metricMap = {
    Restaurant: [
      { value: '4.9', label: 'Guest rating' },
      { value: '24/7', label: 'Booking ready' },
      { value: '12+', label: 'Menu sections' }
    ],
    Fitness: [
      { value: '8+', label: 'Programs' },
      { value: '92%', label: 'Mobile score' },
      { value: '3x', label: 'CTA paths' }
    ],
    Education: [
      { value: 'AI', label: 'Tutor ready' },
      { value: '5x', label: 'Study tools' },
      { value: '100%', label: 'Responsive' }
    ],
    Portfolio: [
      { value: '6+', label: 'Case studies' },
      { value: '3s', label: 'Fast pitch' },
      { value: '1', label: 'Clear CTA' }
    ],
    Dashboard: [
      { value: '12', label: 'Live widgets' },
      { value: '4', label: 'Action lanes' },
      { value: 'Real', label: 'Status view' }
    ],
    Pricing: [
      { value: '3', label: 'Plan tiers' },
      { value: 'FAQ', label: 'Objection handling' },
      { value: 'Fast', label: 'Decision path' }
    ],
    Blog: [
      { value: '10+', label: 'Content blocks' },
      { value: 'SEO', label: 'Ready layout' },
      { value: 'Email', label: 'Capture CTA' }
    ],
    Ecommerce: [
      { value: 'Cart', label: 'Flow ready' },
      { value: '4+', label: 'Product cards' },
      { value: 'Trust', label: 'Signals built in' }
    ],
    SaaS: [
      { value: '9+', label: 'Feature blocks' },
      { value: 'API', label: 'Integration story' },
      { value: 'Pro', label: 'Pricing ready' }
    ],
    Website: [
      { value: '4', label: 'Smart sections' },
      { value: '100%', label: 'Responsive' },
      { value: 'HTML', label: 'Export ready' }
    ]
  };

  return metricMap[type] || metricMap.Website;
};

const getPremiumWorkflow = (type) => {
  const workflowMap = {
    Education: [
      'Capture student goals',
      'Recommend AI study path',
      'Generate quizzes and notes',
      'Convert to signup'
    ],
    Restaurant: [
      'Show signature dishes',
      'Build reservation intent',
      'Highlight social proof',
      'Confirm table booking'
    ],
    Fitness: [
      'Match user goal',
      'Show trainer credibility',
      'Compare memberships',
      'Book first session'
    ],
    Ecommerce: [
      'Feature hero product',
      'Compare benefits',
      'Add to cart',
      'Reinforce trust'
    ]
  };

  return (
    workflowMap[type] || [
      'Open with a strong promise',
      'Show premium proof points',
      'Guide users through sections',
      'Drive one clear action'
    ]
  );
};

const createPricingHtml = () => `
  <section class="pricing-band">
    <div>
      <span class="pill">Pricing</span>
      <h2>Plans built for launch</h2>
    </div>
    <div class="price-grid">
      <article><span>Starter</span><h3>$0</h3><p>Validate the idea with a polished free experience.</p></article>
      <article><span>Pro</span><h3>$29</h3><p>Unlock premium workflows, exports, and advanced sections.</p></article>
      <article><span>Team</span><h3>$99</h3><p>Collaborate, review, and ship production-ready pages faster.</p></article>
    </div>
  </section>`;

const createContactHtml = () => `
  <section class="contact-band">
    <div>
      <span class="pill">Contact</span>
      <h2>Ready to start?</h2>
      <p>Send a message, book a call, or connect the generated form to your backend.</p>
    </div>
    <form>
      <input placeholder="Name" />
      <input placeholder="Email" />
      <button type="button">Send request</button>
    </form>
  </section>`;

const createLocalGeneratedSite = (
  request,
  selectedStyle,
  selectedTheme,
  selectedPageType,
  selectedIndustry
) => {
  const type = resolveGenerationType(request, selectedIndustry, selectedPageType);
  const intent = getCommandIntent(request);
  const title = humanizePromptTitle(request, type, selectedPageType);
  const safeTitle = escapeMarkup(title);
  const safeRequest = escapeMarkup(request || 'Create a modern website');
  const commandSections = [
    intent.pricing ? 'Plan comparison' : '',
    intent.contact ? 'Contact flow' : '',
    intent.animations ? 'Motion system' : '',
    intent.dashboard ? 'Dashboard preview' : '',
    intent.login ? 'Authentication flow' : ''
  ].filter(Boolean);
  const sections = [...new Set([...getLocalSections(type, selectedPageType), ...commandSections])];
  const paletteMap = {
    'Apple Style': ['#f8fbff', '#dbeafe', '#111827'],
    'Framer Style': ['#a78bfa', '#22d3ee', '#080810'],
    'Vercel Style': ['#ffffff', '#a1a1aa', '#050505'],
    Cyberpunk: ['#ff2bd6', '#00f5ff', '#07020f'],
    Glassmorphism: ['#67e8f9', '#c4b5fd', '#08111f'],
    'Anime UI': ['#fb7185', '#67e8f9', '#090716'],
    Neobrutalism: ['#facc15', '#fb7185', '#111827'],
    'Minimal SaaS': ['#5eead4', '#93c5fd', '#08111f'],
    'Gaming UI': ['#a3e635', '#38bdf8', '#061018']
  };
  const themePaletteMap = {
    Light: ['#2563eb', '#14b8a6', '#f8fafc', '#0f172a', '#475569'],
    Dark: null,
    Cyberpunk: ['#ff2bd6', '#00f5ff', '#07020f', '#f8e7ff', '#c4b5fd'],
    Luxury: ['#d6a84f', '#f6df9d', '#080604', '#f7ead2', '#d6c6aa'],
    Neon: ['#00ffbf', '#38bdf8', '#050816', '#eaffff', '#a7f3d0'],
    Glassmorphism: ['#67e8f9', '#c4b5fd', '#08111f', '#f8fbff', '#c7d2e5'],
    Retro: ['#ff7a3d', '#38bdf8', '#1f120c', '#ffe4b5', '#f7c99e']
  };
  const colorOverride = getColorOverride(intent.requestedColor);
  const [accent, accentTwo, background, textColor = '#f8fbff', mutedColor = '#c7d2e5'] =
    colorOverride
      ? [...colorOverride, selectedTheme === 'Light' ? '#f8fafc' : '#070a12', selectedTheme === 'Light' ? '#0f172a' : '#f8fbff', selectedTheme === 'Light' ? '#475569' : '#c7d2e5']
      :
    themePaletteMap[selectedTheme] ||
    paletteMap[selectedStyle] || paletteMap['Minimal SaaS'];
  const cards = sections
    .map(
      (section, index) => `
        <article>
          <span>0${index + 1} / ${escapeMarkup(type)}</span>
          <h3>${escapeMarkup(section)}</h3>
          <p>${escapeMarkup(getPremiumSectionCopy(type, section))}</p>
        </article>`
    )
    .join('');
  const metrics = getPremiumMetrics(type)
    .map(
      (item) => `
        <div class="metric">
          <strong>${escapeMarkup(item.value)}</strong>
          <span>${escapeMarkup(item.label)}</span>
        </div>`
    )
    .join('');
  const workflow = getPremiumWorkflow(type)
    .map((item) => `<li>${escapeMarkup(item)}</li>`)
    .join('');
  const pricingHtml =
    intent.pricing || selectedPageType === 'Pricing page' ? createPricingHtml() : '';
  const contactHtml = intent.contact ? createContactHtml() : '';
  const navBackground = intent.transparentNav
    ? 'background: transparent; border: 1px solid rgba(255,255,255,.12); padding: 14px 16px; border-radius: 18px;'
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${safeTitle}" />
  <title>${safeTitle}</title>
  <style>
    * { box-sizing: border-box; }
    :root { --accent: ${accent}; --accent-two: ${accentTwo}; --bg: ${background}; --text: ${textColor}; --muted: ${mutedColor}; }
    body {
      margin: 0;
      font-family: Inter, system-ui, sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at 12% 8%, color-mix(in srgb, var(--accent) 32%, transparent), transparent 30%),
        radial-gradient(circle at 88% 5%, color-mix(in srgb, var(--accent-two) 28%, transparent), transparent 28%),
        linear-gradient(135deg, var(--bg), #111827 52%, #050816);
    }
    body.light { --bg: #f8fafc; --text: #0f172a; --muted: #475569; background: linear-gradient(135deg, #ffffff, #eef6ff); }
    .wrap { width: min(1160px, calc(100% - 32px)); margin: auto; }
    header { min-height: 92vh; display: grid; align-items: center; padding: 34px 0 18px; }
    nav { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 72px; ${navBackground} }
    .logo { font-size: 22px; font-weight: 900; }
    .pill { display: inline-flex; padding: 10px 13px; border: 1px solid rgba(255,255,255,.16); border-radius: 999px; background: rgba(255,255,255,.08); color: var(--accent); font-weight: 900; }
    .hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: 24px; align-items: end; }
    h1 { max-width: 860px; margin: 18px 0; font-size: clamp(48px, 8vw, 96px); line-height: .94; letter-spacing: 0; }
    .lead { max-width: 760px; color: var(--muted); font-size: 20px; line-height: 1.7; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
    a, button { border: 0; border-radius: 999px; padding: 15px 22px; background: linear-gradient(90deg, var(--accent), var(--accent-two)); color: #041018; text-decoration: none; font-weight: 900; cursor: pointer; }
    button.secondary, a.secondary { border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.08); color: white; }
    .showcase { min-height: 440px; padding: 22px; border: 1px solid rgba(255,255,255,.14); border-radius: 24px; background: rgba(255,255,255,.08); box-shadow: 0 28px 90px rgba(0,0,0,.36); backdrop-filter: blur(18px); }
    .screen { height: 100%; min-height: 390px; border-radius: 18px; padding: 18px; background: linear-gradient(160deg, rgba(255,255,255,.14), rgba(255,255,255,.04)); display: grid; align-content: space-between; }
    .chart { display: grid; grid-template-columns: repeat(6, 1fr); align-items: end; gap: 8px; height: 180px; }
    .chart span { border-radius: 999px 999px 8px 8px; background: linear-gradient(180deg, var(--accent), var(--accent-two)); min-height: 42px; }
    .chart span:nth-child(2) { height: 55%; } .chart span:nth-child(3) { height: 80%; } .chart span:nth-child(4) { height: 48%; } .chart span:nth-child(5) { height: 92%; } .chart span:nth-child(6) { height: 64%; }
    .mini-list { display: grid; gap: 10px; }
    .mini-list div { display: flex; justify-content: space-between; gap: 12px; padding: 12px; border-radius: 14px; background: rgba(0,0,0,.2); }
    .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 42px 0 18px; }
    .metric { padding: 18px; border: 1px solid rgba(255,255,255,.13); border-radius: 18px; background: rgba(255,255,255,.08); }
    .metric strong { display: block; font-size: 32px; }
    .metric span { color: var(--muted); }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; padding: 0 0 64px; }
    article { min-height: 210px; padding: 24px; border: 1px solid rgba(255,255,255,.13); border-radius: 16px; background: rgba(255,255,255,.08); backdrop-filter: blur(16px); transition: transform .25s ease, border-color .25s ease; }
    article:hover { transform: translateY(-8px); border-color: color-mix(in srgb, var(--accent) 65%, transparent); }
    article span { color: var(--accent); font-size: 12px; font-weight: 900; text-transform: uppercase; }
    article h3 { margin: 18px 0 10px; font-size: 26px; }
    article p { margin: 0; color: var(--muted); line-height: 1.65; }
    .workflow { margin: 0 0 64px; padding: 28px; border: 1px solid rgba(255,255,255,.13); border-radius: 20px; background: rgba(0,0,0,.2); }
    .workflow h2 { margin: 0 0 16px; font-size: 32px; }
    .workflow ol { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 12px; padding: 0; margin: 0; list-style: none; }
    .workflow li { padding: 16px; border-radius: 14px; background: rgba(255,255,255,.08); color: #dbeafe; }
    .strip { margin-bottom: 18px; padding: 18px; border-radius: 16px; background: color-mix(in srgb, var(--accent) 18%, transparent); color: #dffefa; }
    .pricing-band, .contact-band { margin: 0 0 64px; padding: 28px; border: 1px solid rgba(255,255,255,.13); border-radius: 22px; background: rgba(255,255,255,.07); }
    .price-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px; margin-top: 18px; }
    .contact-band { display: grid; grid-template-columns: 1fr 360px; gap: 20px; align-items: end; }
    .contact-band form { display: grid; gap: 12px; }
    .contact-band input { min-height: 50px; border: 1px solid rgba(255,255,255,.14); border-radius: 12px; padding: 0 14px; background: rgba(255,255,255,.08); color: var(--text); }
    ${intent.animations ? 'article, .metric, .showcase { animation: floatIn .7s ease both; } @keyframes floatIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }' : ''}
    @media (max-width: 920px) { .hero-grid { grid-template-columns: 1fr; } .metrics { grid-template-columns: 1fr; } }
    @media (max-width: 760px) { nav, .actions, .contact-band { align-items: stretch; grid-template-columns: 1fr; flex-direction: column; } a, button { width: 100%; text-align: center; } }
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
      <div class="hero-grid">
        <div>
          <h1>${safeTitle}</h1>
          <p class="lead">${escapeMarkup(getPremiumHeroCopy(type))}</p>
          <div class="actions">
            <button type="button" onclick="document.getElementById('sections')?.scrollIntoView({ behavior: 'smooth', block: 'start' })">Explore sections</button>
            <button type="button" class="secondary" onclick="document.body.classList.toggle('light')">Transform theme</button>
          </div>
        </div>
        <aside class="showcase">
          <div class="screen">
            <div class="mini-list">
              <div><span>AI layout</span><strong>Ready</strong></div>
              <div><span>Responsive</span><strong>100%</strong></div>
              <div><span>Export</span><strong>HTML</strong></div>
            </div>
            <div class="chart"><span></span><span></span><span></span><span></span><span></span><span></span></div>
          </div>
        </aside>
      </div>
      <section class="metrics">${metrics}</section>
    </div>
  </header>
  <main class="wrap">
    <div class="strip">Generated from prompt: ${safeRequest}. All builder options are applied: style, theme, industry, and page type.</div>
    <section class="grid" id="sections">${cards}</section>
    ${pricingHtml}
    ${contactHtml}
    <section class="workflow">
      <h2>Built-in launch flow</h2>
      <ol>${workflow}</ol>
    </section>
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

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read the screenshot.'));
    reader.readAsDataURL(file);
  });

const toHex = (value) => value.toString(16).padStart(2, '0');

const analyzeScreenshot = async (file) => {
  const dataUrl = await readFileAsDataUrl(file);

  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d', { willReadFrequently: true });
      const sampleSize = 24;
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      context.drawImage(image, 0, 0, sampleSize, sampleSize);

      const pixels = context.getImageData(0, 0, sampleSize, sampleSize).data;
      let red = 0;
      let green = 0;
      let blue = 0;
      let brightRed = 0;
      let brightGreen = 0;
      let brightBlue = 0;
      let brightCount = 0;

      for (let index = 0; index < pixels.length; index += 4) {
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        red += r;
        green += g;
        blue += b;

        if (r + g + b > 260) {
          brightRed += r;
          brightGreen += g;
          brightBlue += b;
          brightCount += 1;
        }
      }

      const count = pixels.length / 4;
      const average = [
        Math.round(red / count),
        Math.round(green / count),
        Math.round(blue / count)
      ];
      const brightAverage = brightCount
        ? [
            Math.round(brightRed / brightCount),
            Math.round(brightGreen / brightCount),
            Math.round(brightBlue / brightCount)
          ]
        : [94, 234, 212];
      const toColor = ([r, g, b]) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;

      resolve({
        dataUrl,
        fileName: file.name,
        width: image.naturalWidth,
        height: image.naturalHeight,
        orientation: image.naturalWidth >= image.naturalHeight ? 'wide' : 'tall',
        baseColor: toColor(average),
        accent: toColor(brightAverage),
        accentTwo: '#38bdf8'
      });
    };
    image.onerror = () => {
      resolve({
        dataUrl,
        fileName: file.name,
        width: 0,
        height: 0,
        orientation: 'unknown',
        baseColor: '#0f172a',
        accent: '#5eead4',
        accentTwo: '#38bdf8'
      });
    };
    image.src = dataUrl;
  });
};

const createScreenshotRemixSite = (
  request,
  selectedStyle,
  selectedTheme,
  selectedPageType,
  selectedIndustry,
  screenshotProfile
) => {
  const type = resolveGenerationType(request, selectedIndustry, selectedPageType);
  const title = humanizePromptTitle(request, type, selectedPageType);
  const safeTitle = escapeMarkup(title);
  const safeRequest = escapeMarkup(request || 'Screenshot remix website');
  const sections = [
    'Screenshot layout analysis',
    ...getLocalSections(type, selectedPageType),
    'Responsive remix',
    'Export-ready build'
  ].slice(0, 7);
  const cards = sections
    .map(
      (section, index) => `
        <article>
          <span>0${index + 1} / Remix</span>
          <h3>${escapeMarkup(section)}</h3>
          <p>${escapeMarkup(getPremiumSectionCopy(type, section))}</p>
        </article>`
    )
    .join('');
  const previewCards = getLocalSections(type, selectedPageType)
    .slice(0, 4)
    .map((section) => `<div><strong>${escapeMarkup(section)}</strong><span>${escapeMarkup(type)}</span></div>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${safeTitle}" />
  <title>${safeTitle}</title>
  <style>
    * { box-sizing: border-box; }
    :root {
      --accent: ${screenshotProfile.accent};
      --accent-two: ${screenshotProfile.accentTwo};
      --base: ${screenshotProfile.baseColor};
      --text: #f8fbff;
      --muted: #cbd5e1;
    }
    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at 14% 8%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 26%),
        radial-gradient(circle at 86% 12%, color-mix(in srgb, var(--accent-two) 24%, transparent), transparent 28%),
        linear-gradient(135deg, color-mix(in srgb, var(--base) 45%, #050816), #070a12 54%, #020617);
    }
    .wrap { width: min(1180px, calc(100% - 32px)); margin: auto; }
    header { min-height: 94vh; display: grid; align-items: center; padding: 34px 0; }
    nav { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 58px; }
    .logo { font-size: 22px; font-weight: 950; }
    .pill { display: inline-flex; padding: 10px 13px; border: 1px solid rgba(255,255,255,.16); border-radius: 999px; background: rgba(255,255,255,.08); color: var(--accent); font-weight: 900; }
    .hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(340px, 460px); gap: 28px; align-items: center; }
    h1 { max-width: 820px; margin: 18px 0; font-size: clamp(46px, 7vw, 92px); line-height: .94; letter-spacing: 0; }
    .lead { max-width: 720px; color: var(--muted); font-size: 20px; line-height: 1.7; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
    button { min-height: 52px; border: 0; border-radius: 999px; padding: 0 22px; background: linear-gradient(90deg, var(--accent), var(--accent-two)); color: #031014; font-weight: 900; cursor: pointer; }
    button.secondary { border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.08); color: white; }
    .reference { padding: 18px; border: 1px solid rgba(255,255,255,.15); border-radius: 24px; background: rgba(255,255,255,.08); box-shadow: 0 30px 90px rgba(0,0,0,.38); backdrop-filter: blur(18px); }
    .remix-screen { min-height: 360px; overflow: hidden; border-radius: 18px; border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.92); color: #111827; }
    .remix-top { display: grid; grid-template-columns: 1fr 120px 44px; gap: 10px; align-items: center; padding: 14px; border-bottom: 1px solid #e5e7eb; }
    .remix-top strong { color: #111827; }
    .remix-search { height: 34px; border-radius: 999px; background: #f1f5f9; }
    .remix-avatar { width: 34px; height: 34px; border-radius: 999px; background: linear-gradient(135deg, var(--accent), var(--accent-two)); }
    .remix-body { display: grid; grid-template-columns: 112px 1fr; min-height: 304px; }
    .remix-side { padding: 14px 10px; background: #111827; display: grid; align-content: start; gap: 9px; }
    .remix-side span { height: 28px; border-radius: 8px; background: rgba(255,255,255,.12); }
    .remix-side span:first-child { background: var(--accent); }
    .remix-main { padding: 14px; background: linear-gradient(135deg, #f8fafc, #eef2ff); }
    .remix-hero { display: grid; grid-template-columns: 1fr 86px; gap: 12px; min-height: 94px; margin-bottom: 12px; padding: 14px; border-radius: 16px; background: #ffffff; box-shadow: 0 14px 35px rgba(15,23,42,.08); }
    .remix-hero h2 { margin: 0 0 8px; font-size: 20px; color: #111827; }
    .remix-hero p { margin: 0; color: #64748b; font-size: 12px; line-height: 1.5; }
    .remix-mark { border-radius: 18px; background: linear-gradient(135deg, var(--accent), var(--accent-two)); }
    .remix-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .remix-grid div { min-height: 82px; padding: 12px; border-radius: 14px; background: #ffffff; box-shadow: 0 12px 30px rgba(15,23,42,.07); }
    .remix-grid strong { display: block; font-size: 13px; color: #111827; }
    .remix-grid span { display: block; margin-top: 16px; color: #64748b; font-size: 11px; }
    .strip { margin: 18px 0; padding: 18px; border-radius: 16px; background: color-mix(in srgb, var(--accent) 18%, transparent); color: #eaffff; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; padding: 18px 0 70px; }
    article { min-height: 210px; padding: 24px; border: 1px solid rgba(255,255,255,.13); border-radius: 16px; background: rgba(255,255,255,.08); backdrop-filter: blur(16px); transition: transform .25s ease, border-color .25s ease; }
    article:hover { transform: translateY(-8px); border-color: color-mix(in srgb, var(--accent) 65%, transparent); }
    article span { color: var(--accent); font-size: 12px; font-weight: 900; text-transform: uppercase; }
    article h3 { margin: 18px 0 10px; font-size: 25px; }
    article p { margin: 0; color: var(--muted); line-height: 1.65; }
    @media (max-width: 900px) { .hero { grid-template-columns: 1fr; } nav, .actions { align-items: stretch; flex-direction: column; } button { width: 100%; } }
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <nav>
        <div class="logo">ProjectMaker AI</div>
        <div class="pill">${escapeMarkup(selectedStyle)} • ${escapeMarkup(selectedTheme)}</div>
      </nav>
      <div class="hero">
        <div>
          <span class="pill">Screenshot remix • ${escapeMarkup(type)}</span>
          <h1>${safeTitle}</h1>
          <p class="lead">A premium website remix generated from your uploaded screenshot and prompt. The layout, color mood, visual rhythm, and responsive sections are adapted into an export-ready single-file page.</p>
          <div class="actions">
            <button type="button" onclick="document.getElementById('sections')?.scrollIntoView({ behavior: 'smooth', block: 'start' })">Explore sections</button>
            <button type="button" class="secondary" onclick="document.body.classList.toggle('focus')">Remix mood</button>
          </div>
        </div>
        <aside class="reference">
          <div class="remix-screen" aria-label="Recreated website layout from uploaded screenshot">
            <div class="remix-top">
              <strong>${safeTitle}</strong>
              <div class="remix-search"></div>
              <div class="remix-avatar"></div>
            </div>
            <div class="remix-body">
              <div class="remix-side"><span></span><span></span><span></span><span></span><span></span></div>
              <div class="remix-main">
                <div class="remix-hero">
                  <div>
                    <h2>Premium ${escapeMarkup(type)} hub</h2>
                    <p>Recreated from the uploaded screenshot structure with cleaner spacing, stronger hierarchy, and launch-ready sections.</p>
                  </div>
                  <div class="remix-mark"></div>
                </div>
                <div class="remix-grid">${previewCards}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </header>
  <main class="wrap">
    <div class="strip">Generated from prompt: ${safeRequest}. Screenshot-to-website mode recreated the visual structure as a polished, responsive website.</div>
    <section class="grid" id="sections">${cards}</section>
  </main>
  <script>
    document.querySelectorAll('article').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(18px)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 85);
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
    if (!prompt.trim() && !extraInstruction.trim() && !screenshot) return;
    const effectivePrompt = [prompt, extraInstruction]
      .filter((item) => item && item.trim())
      .join('\nCommand: ');

    try {
      setLoading(true);
      setErrorMessage('');
      setStatusMessage('Connecting to the AI builder...');

      if (screenshot) {
        setStatusMessage('Reading screenshot and building a visual remix...');
        const screenshotProfile = await analyzeScreenshot(screenshot);
        const screenshotHtml = createScreenshotRemixSite(
          effectivePrompt || `Remix ${screenshot.name} into a premium website`,
          style,
          theme,
          pageType,
          industry,
          screenshotProfile
        );

        setSiteHtml(screenshotHtml);
        setStatusMessage('Screenshot converted into a premium remix preview.');
        await saveGeneratedProject(screenshotHtml, effectivePrompt, 'Screenshot remix');

        window.setTimeout(() => {
          resultRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 120);

        return;
      }

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
      const backendUsedFallback = Boolean(responsePayload?.warning);

      if (
        backendUsedFallback ||
        !cleaned ||
        !hasVisibleHtml(cleaned) ||
        isLowQualityGeneratedHtml(cleaned)
      ) {
        cleaned = effectivePrompt.toLowerCase().includes('weather')
          ? createLocalWeatherSite(effectivePrompt)
          : createLocalGeneratedSite(effectivePrompt, style, theme, pageType, industry);
      }

      if (!cleaned) {
        throw new Error('The backend returned an empty website.');
      }

      setSiteHtml(cleaned);
      await saveGeneratedProject(cleaned, effectivePrompt, 'Generated');

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

  const saveGeneratedProject = async (html, effectivePrompt, mode = 'Generated') => {
    if (!localStorage.getItem('token')) {
      return;
    }

    try {
      const project = await createProject({
        title: getProjectTitle(effectivePrompt),
        prompt: effectivePrompt,
        generatedCode: html,
        folder: pageType,
        status: mode,
        style,
        projectType: pageType,
        tags: [style, theme, industry, pageType].filter(Boolean)
      });

      setStatusMessage(`Website generated and saved to your account as "${project.title}".`);
    } catch (saveError) {
      console.log('PROJECT SAVE ERROR:', saveError);
      setStatusMessage('Website generated. Auto-save could not complete, so copy or export the code.');
    }
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
      <div className="generator-orb one"></div>
      <div className="generator-orb two"></div>
      <div className="generator-shell">
        <aside className="builder-sidebar">
          <div className="builder-logo">
            <span>AI</span>
            <strong>ProjectMaker</strong>
          </div>
          <a href="#prompt">Website Builder</a>
          <a href="/ai-project-generator">Project Generator</a>
          <a href="/project-analyzer">Idea Analyzer</a>
          <a href="/saved-projects">Saved Projects</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/">Home</a>
          <button
            className="sidebar-logout"
            type="button"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
          <div className="builder-usage-card">
            <span>Account generation</span>
            <strong>Auto-save on</strong>
            <p>Every generated website is stored with prompt, style, device preview, and export history.</p>
          </div>
        </aside>

        <main className="generator-workspace">
        <section className="generator-intro">
          <span className="generator-badge">Account AI Builder</span>

          <h1>Build inside your workspace.</h1>

          <p>
            Prompt, speak, or upload a screenshot. ProjectMaker saves the result to
            your account with preview, restyle, export, and edit tools.
          </p>

          <div className="generator-capabilities">
            <span>JWT account</span>
            <span>Auto-save</span>
            <span>Style versions</span>
            <span>AI suggestions</span>
          </div>
        </section>

        <section className="builder-panel">
          <div className="prompt-panel" id="prompt">
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

            <div className="assistant-preview-card">
              <span>AI Design Assistant</span>
              <h3>Ready to improve your generated UI</h3>
              <p>After generation, use live edit, theme switching, code export, and dashboard project history.</p>
            </div>
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
                sandbox="allow-scripts allow-forms allow-same-origin"
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
        </main>
      </div>
    </div>
  );
}

export default GeneratorPage;
