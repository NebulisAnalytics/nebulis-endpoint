import http from 'http';
import fs from 'fs';
import colors from 'colors';
import messages from './messages';
import git from './git';
import connect from './connect';

const logPath = `${__dirname}/../logs/api.log`;
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });

const out = process.stdout;
let config;

console.log(process.cwd());

messages.logo();

try {
  config = require(process.cwd() + `/.nebulis.json`);
  if (!config.server || !config.port) { throw 'error'; }

  connect.init(config);
} catch (err) {
  out.write('Welcome to Nebulis. To get started please insert a .nebulis.json file in your app directory, per the instructions.')
} 

const main = () => {
  out.write('\nNebulis endpoint is connected\n'.yellow);

  if (git.status().stderr.toString().indexOf('Not a git repository') >= 0) {
    out.write('[NEW ENDPOINT DETECTED]\n'.red);
    git.init(config.remote);
  }

  git.stage();
  git.commit();

  fs.watch(process.cwd(), function (event, filename) {
    if (filename) {
      out.write('\nFile was modified: '.blue + filename.blue + '\n');
      git.stage();
      const repo = git.commit();
      if (repo.stdout.toString().indexOf('nothing to commit, working tree clean') === -1) {
        out.write(repo.stdout.toString().blue);
        git.push(config);
      } else {
        out.write('No changes found\n'.blue);
      }
    } else {
      console.log('filename not provided');
    }
  });

}

export { main as default };