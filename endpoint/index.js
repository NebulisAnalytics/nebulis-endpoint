import Express from 'express';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import {messages} from './messages';
var colors = require('colors');

const app = new Express();
const server = new http.Server(app);
const logPath = __dirname + '/../logs/api.log';
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });

app.set('trust proxy', 1);
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());

server.listen(3030, () => {
  const host = server.address().address;
  const port = server.address().port;

  messages.logo();
  console.log(messages);

const spawn = require('child_process' ).spawnSync;
const ls = spawn( 'git', [ '--git-dir=.nebugit', 'status' ] );

if (ls.stderr.toString().indexOf('Not a git repository') >= 0) {
  console.log('Initializing new endpoint...');
}

// console.log( `stderr: ${ls.stderr.toString()}` );
// console.log( `stdout: ${ls.stdout.toString()}` );

// git --git-dir=.nebugit --work-tree=. init

// git --git-dir=.nebugit --work-tree=. status

  console.log('Nebulis endpoint is connected');
});
