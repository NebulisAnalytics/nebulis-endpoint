import http from 'http';
import fs from 'fs';
import colors from 'colors';
import messages from './messages';
import git from './git';
import getDetails from './getDetails';
import connect from './connect';
import watch from 'node-watch';

const logPath = `${__dirname}/../logs/api.log`;
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });

const out = process.stdout;
let config;

console.log(process.cwd());

messages.logo();

//////////////////////////////////
// The order:
// 1. check if project has .nebulis server details
// 2. check if the repo is initiated.
//  a. try to extract git config data for the github user
//  b. check to see if we have .nebulis user details
//    I. prompt for user to enter details
//    II. init the local repo
//

const start = () => {
//TODO: detect if this is endpoint has user name info stored already.

  if (git.status().stderr.toString().indexOf('Not a git repository') >= 0) {

    out.write('[NEW ENDPOINT DETECTED]\n'.red);

    //read configuration data from git config file
    let str = fs.readFileSync('./.git/config').toString();
    str = str.substring(str.indexOf('github.com')+11, str.indexOf('.git'));
    const gitConfig = str.split('/');

    // these are for reference
    // config.owner = gitConfig[0];
    // config.project = gitConfig[1];
    getDetails(gitConfig[0], gitConfig[1]);

  } else main();

}

const receivedDetails = (details) => {
  connect.init(details, () => {
    git.init(config.remote);
    main();
  });
}

const main = () => {

  out.write('\nNebulis endpoint is connected\n'.yellow);

  git.stage();
  git.commit();

  const filter = (name) => {
    return !/\.nebugit|\.git|node_modules/.test(name);
  };

  watch(process.cwd(), { recursive: true, filter }, function(event, filename) {
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

//1. check if project has .nebulis server details
try {
  config = require(process.cwd() + `/.nebulis.json`);
  if (!config.server || !config.port) { throw 'error'; }
  else {
    start();
  }

} catch (err) {
  console.log(err);

  out.write('Welcome to Nebulis. To get started please insert a .nebulis.json file in your app directory, per the instructions.')
} 

export { main, start, receivedDetails};