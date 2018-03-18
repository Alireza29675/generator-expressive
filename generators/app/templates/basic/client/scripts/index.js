<% if (withReact) { %>import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

ReactDOM.render(<App />, document.querySelector('.react-target'));
<% } else { %>
console.log('It works!');
<% } %>