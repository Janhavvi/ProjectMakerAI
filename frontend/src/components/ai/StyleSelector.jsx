import './StyleSelector.css';

const styles = [
  'Apple style',
  'Vercel style',
  'Framer style',
  'Luxury brand style',
  'Cyberpunk style',
  'Glassmorphism style',
  'Neobrutalism style',
  'Gaming style',
  'Anime UI style',
  'Minimal SaaS style',
  'Dark futuristic style',
  'Colorful startup style'
];

function StyleSelector({ value, onChange }) {
  return (
    <div className="style-selector">
      {styles.map((style) => (
        <button
          type="button"
          className={value === style ? 'active' : ''}
          key={style}
          onClick={() => onChange(style)}
        >
          {style}
        </button>
      ))}
    </div>
  );
}

export default StyleSelector;
