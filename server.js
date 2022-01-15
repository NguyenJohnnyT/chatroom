const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const cache = {};
const chatServer = require('./lib/chat_server');

const send404 = (response) => {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
};

const sendFile = (response, filePath, fileContents) => {
  response.writeHead(
    200,
    {"content-type": mime.getType(path.basename(filePath))}
  );
  response.end(fileContents);
};

const serveStatic = (response, cache, absPath) => {
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  } else {
    fs.exists(absPath, function(exists) {
      if (exists) {
        fs.readFile(absPath, function (err, data) {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    })
  }
};

const server = http.createServer((req, res) => {
  let filePath = false;
  if (req.url === '/') {
    filePath = 'public/index.html';
  } else {
    filePath = 'public' + req.url;
  }
  const absPath = './' + filePath;
  serveStatic(res, cache, absPath);
});

chatServer(server);
server.listen(3000, function () {
  console.log("Server listening on port 3000.");
});