const connect = require('connect');
const serveStatic = require('serve-static');
const publicDir = __dirname + '/public';

connect().use( serveStatic(publicDir)).listen(process.env.PORT || 8080, function() {
    console.log('Server running on 8080...');
});