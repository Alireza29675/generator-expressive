module.exports = {
    <% if (withMongoose) { %>db: {
        host: 'mongodb://localhost/',
        dbname: ''
    }<% } %>
}