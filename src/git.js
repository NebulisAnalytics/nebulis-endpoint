const spawn = require('child_process').spawnSync;

const GIT_DIR = '--git-dir=.nebugit';
const WORK_TREE = '--work-tree=.';

const out = process.stdout;
const outErr = process.stderr;

const git = {
  init: (remote) => { 
    out.write('Initializing endpoint storage... '); 
    return [
      handler(spawn('git', [GIT_DIR, WORK_TREE, 'init']), false, false),
      handler(spawn('git', [GIT_DIR, WORK_TREE, 'remote', 'add', 'origin', remote]), false, false),
      handler(spawn('git', [GIT_DIR, WORK_TREE, 'config', 'core.autocrlf', 'false']), false, false),
      // handler(spawn('git', [GIT_DIR, WORK_TREE, 'checkout', '-b', 'nebutrack']), false, false), 
    ]; 
  },
  status: () => {
    out.write('Checking Storage... ');
    return handler(spawn('git', [GIT_DIR, WORK_TREE, 'status']), false, false); },
  stage: () => {
    out.write('Preparing Stage... '); 
    return handler(spawn('git', [GIT_DIR, WORK_TREE, 'add', '.'])); 
  }, 
  commit: (verbose = false, errors = false) => {
    out.write('Checking for changes... ');
    return handler(spawn('git', [GIT_DIR, WORK_TREE, 'commit', '-m', Date()]), verbose, errors); 
  },
  push: () => {
    out.write('Syncing endpoint to server... ');
    return handler(spawn('git', [GIT_DIR, WORK_TREE, 'push', '-f', '--all', 'origin']), true, true, true);
  }
}

const handler = (proc, verbose = false, errors = true, grace = false) => {
  if (proc.stderr.length < 1 || errors === false) { 
    verbose ? out.write(` ${'[DONE]\n'.magenta} ${proc.stdout.toString().red}`) : out.write(' [DONE]\n'.magenta);
  } else {
    if (errors && !grace) outErr.write(`${'[ERROR]'.red} output: "${proc.stderr}"`);
    else if (grace) out.write(`[DONE]\n${proc.stderr}`);
  }
  return proc;
}

export { git as default };
