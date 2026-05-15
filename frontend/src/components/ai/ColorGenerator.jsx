// src/components/ai/ColorGenerator.jsx

import {
  useState
} from 'react';

import './ColorGenerator.css';

function ColorGenerator() {

  const [colors, setColors] =
    useState([
      '#6c63ff',
      '#00d4ff',
      '#ff4ecd'
    ]);

  const generateColors = () => {

    const randomColor = () =>
      '#' +
      Math.floor(
        Math.random() * 16777215
      ).toString(16);

    setColors([
      randomColor(),
      randomColor(),
      randomColor()
    ]);
  };

  return (
    <div className="color-generator">

      <h2>
        AI Color Palette
      </h2>

      <div className="color-palette">

        {colors.map(
          (color, index) => (

            <div
              className="color-box"
              key={index}

              style={{
                background: color
              }}
            >

              <span>
                {color}
              </span>

            </div>

          )
        )}

      </div>

      <button
        onClick={generateColors}
      >
        Generate Palette
      </button>

    </div>
  );
}

export default ColorGenerator;