import './scripts/index.js'
<% if (withSass) { %>import './stylesheets/index.sass'
<% } %>

<% if (withSocket) { %>import './scripts/socket-test'<% } %>