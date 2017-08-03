import http from 'http';
import morgan from 'morgan';
import fs from 'fs';
import colors from 'colors';
import messages from './messages';
import git from './git';
import connect from './connect';

const logPath = `${__dirname}/../logs/api.log`;
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });
const CONFIG_DIR = __dirname + `/../.nebulis.json`;
let config = require(CONFIG_DIR);

connect.init(config);
messages.logo();

const main = () => {
  console.log(config);

  const out = process.stdout;
  if (git.status().stderr.toString().indexOf('Not a git repository') >= 0) {
    out.write('[NEW ENDPOINT DETECTED]\n'.red);
    git.init();
  }

  git.stage();
  git.commit();

  fs.watch(__dirname, function (event, filename) {
    if (filename) {
      out.write('\nFile was modified: '.blue + filename.blue + '\n');
      git.stage();
      const repo = git.commit();
      if (repo.stdout.toString().indexOf('nothing to commit, working tree clean') === -1) {
        out.write(repo.stdout.toString().blue);
        git.push();
      } else {
        out.write('No changes found\n'.blue);
      }
    } else {
      console.log('filename not provided');
    }
  });

  out.write('\nNebulis endpoint is connected\n'.yellow);
}

export { main as default };