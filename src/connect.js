import fs from 'fs';
import {receivedDetails} from './main'
var http = require('http');

const connect = {
  init: (config, cb) => {
    const options = {
      host: config.server,
      port: config.port,
      path: '/api/endpoints/establish',
      method: 'POST',
    };

    var req = http.request(options, function(res) {
      let body = '';
      // console.log('STATUS: ' + res.statusCode);
      // console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        body += chunk;
      });
      res.on('end', () => {
        // console.log('BODY: ' + body);
        const id = JSON.parse(body).id;
        config.remote = JSON.parse(body).remote;
        if(id !== undefined) {
          console.log('Endpoint ID: ' + id);
          cb();
        } else {
          console.log('Endpoint Error');
        }
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    req.write(JSON.stringify({
      owners: config.owners,
      project: config.project,
    }));
    req.end(); 
  }

}

export { connect as default };