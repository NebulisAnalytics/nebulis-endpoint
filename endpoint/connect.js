import fs from 'fs';
var http = require('http');

const connect = {
  init: (config) => {
    const options = {
      host: config.server,
      port: config.port,
      path: '/api/endpoints/establish',
      method: 'POST',
    };
    console.log(options);
    var req = http.request(options, function(res) {
      // console.log('STATUS: ' + res.statusCode);
      // console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    // write data to request body
    let str = fs.readFileSync(__dirname + '/../.git/config').toString();
    str = str.substring(str.indexOf('git@github.com:')+15, str.indexOf('.git'))
    const gitConfig = str.split('/');

    config.owner = gitConfig[0];
    config.project = gitConfig[1],

    req.write(JSON.stringify({
      owner: config.owner,
      project: config.project,
    }));
    req.end(); 
  }

}

export { connect as default };