var http = require('http');
var dt = require('./myfirstmodule');
var dt = require('./myfirstmodule');
 
var server = http.createServer(function(request, response) {
  // magic happens here!
  response.writeHead(200, {'Content-Type' : 'text/html'});
  response.write("The date and time are currently: " + dt.myDateTime());
  response.end();
}).listen(8080);