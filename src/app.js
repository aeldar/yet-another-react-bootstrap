import React from 'react';
import ReactDOM from 'react-dom';

import App from 'containers/App/App.jsx';

// require instead import is used to make eslint calm. That is more an exception than rule (I hope).
require('static/styles/base.css');
require('normalize.css');

ReactDOM.render(<App />, document.getElementById('root'));
