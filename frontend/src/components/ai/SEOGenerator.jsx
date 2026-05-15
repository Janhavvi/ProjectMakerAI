// src/components/ai/SEOGenerator.jsx

import {
  useState
} from 'react';

import './SEOGenerator.css';

function SEOGenerator() {

  const [seo, setSeo] =
    useState('');

  const generateSEO = () => {

    setSeo(`
Title: AI Startup Website

Description:
Build futuristic AI websites instantly using ProjectMaker AI.

Keywords:
AI Website Builder, AI Generator, Startup Website
    `);
  };

  return (
    <div className="seo-generator">

      <h2>
        AI SEO Generator
      </h2>

      <button
        onClick={generateSEO}
      >
        Generate SEO
      </button>

      {seo && (

        <pre>
          {seo}
        </pre>

      )}

    </div>
  );
}

export default SEOGenerator;