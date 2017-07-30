import Express from 'express';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import colors from 'colors';
import messages from './messages';
import git from './git';

const app = new Express();
const logPath = `${__dirname}/../logs/api.log`;
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });

app.set('trust proxy', 1);
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());

messages.logo();
const out = process.stdout;
if (git.status().stderr.toString().indexOf('Not a git repository') >= 0) {
  out.write('[NEW ENDPOINT DETECTED]\n'.red);
  git.init();
  git.stage();
  git.commit();
}


fs.watch(__dirname, function (event, filename) {
  if (filename) {
    out.write('\nFile was modified: '.blue + filename.blue + '\n');
    git.stage();
    git.commit();
  } else {
    console.log('filename not provided');
  }
});

// out.write(git.status().stderr.toString());

// console.log( `stderr: ${ls.stderr.toString()}` );
// console.log( `stdout: ${ls.stdout.toString()}` );

// git --git-dir=.nebugit --work-tree=. init

// git --git-dir=.nebugit --work-tree=. status

out.write('\nNebulis endpoint is connected\n'.yellow);

