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
const server = new http.Server(app);
const logPath = `${__dirname}/../logs/api.log`;
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });

app.set('trust proxy', 1);
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());

server.listen(9986, () => {
  messages.logo();
  const out = process.stdout;

  if (git.status().stderr.toString().indexOf('Not a git repository') >= 0) {
    out.write('Initializing endpoint storage...');
    const repo = git.init();
  }

  git.commit();

  // out.write(git.status().stderr.toString());

  // console.log( `stderr: ${ls.stderr.toString()}` );
  // console.log( `stdout: ${ls.stdout.toString()}` );

  // git --git-dir=.nebugit --work-tree=. init

  // git --git-dir=.nebugit --work-tree=. status

  out.write('\nNebulis endpoint is connected\n'.yellow);
});
