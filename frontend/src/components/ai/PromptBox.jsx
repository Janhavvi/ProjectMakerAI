// src/components/ai/PromptBox.jsx

import {
  useState
} from 'react';

import './PromptBox.css';

function PromptBox({
  onGenerate
}) {

  const [prompt, setPrompt] =
    useState('');

  const handleGenerate = () => {

    if (!prompt) return;

    onGenerate(prompt);
  };

  return (
    <div className="prompt-box">

      <textarea
        placeholder="
Create a futuristic AI startup landing page...
        "

        value={prompt}

        onChange={(e) =>
          setPrompt(e.target.value)
        }
      />

      <button
        onClick={handleGenerate}
      >
        Generate Website
      </button>

    </div>
  );
}

export default PromptBox;