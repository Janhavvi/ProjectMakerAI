// src/pages/NotFoundPage.jsx

import {
  Link
} from 'react-router-dom';

import './NotFoundPage.css';

function NotFoundPage() {

  return (
    <div className="notfound-page">

      <h1>
        404
      </h1>

      <p>
        The page you are looking
        for does not exist.
      </p>

      <Link to="/">
        Go Back Home
      </Link>

    </div>
  );
}

export default NotFoundPage;