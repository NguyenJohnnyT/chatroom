const http = require('http');
const express = require('express');
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

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', (req, res) => {
  send404(res);
});

chatServer(server);
server.listen(PORT, function () {
  console.log("Server listening on port 3000.");
});