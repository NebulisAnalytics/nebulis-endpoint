import http from 'http';
import fs from 'fs';
import colors from 'colors';
import messages from './messages';
import git from './git';
import connect from './connect';

const logPath = `${__dirname}/../logs/api.log`;
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });
var appRoot = require('app-root-path');

const out = process.stdout;
let config;

try {
  config = require(appRoot + `/.nebulis.json`);
} catch(err) {
  out.write('Welcome to Nebulis. To get started please ins')
} 

connect.init(config);
messages.logo();

const main = () => {
  out.write('\nNebulis endpoint is connected\n'.yellow);

  if (git.status().stderr.toString().indexOf('Not a git repository') >= 0) {
    out.write('[NEW ENDPOINT DETECTED]\n'.red);
    git.init(config.remote);
  }

  git.stage();
  git.commit();

  fs.watch(appRoot, function (event, filename) {
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