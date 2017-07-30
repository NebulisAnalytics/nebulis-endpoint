const spawn = require('child_process').spawnSync;

const GIT_DIR = '--git-dir=.nebugit';
const WORK_TREE = '--work-tree=.';
const out = process.stdout;
const outErr = process.stderr;

const git = {
  init: () => { 
    out.write('Initializing endpoint storage... '); 
    return handler(spawn('git', [GIT_DIR, WORK_TREE, 'init']), false); 
  },
  status: () => {
    out.write('Checking Storage... '); 
    return handler(spawn('git', [GIT_DIR, WORK_TREE, 'status']), false, false); },
  stage: () => {
    out.write('Preparing Stage... '); 
    return handler(spawn('git', [GIT_DIR, WORK_TREE, 'add', '.']), false); 
  },
  commit: () => {
    out.write('Saving Changes... '); 
    return handler(spawn('git', [GIT_DIR, WORK_TREE, 'commit', '-m', Date()]), false); 
  },
  push: () => {
    return handler(spawn('git', [GIT_DIR, WORK_TREE, 'push'])); 
  },
};

const handler = (proc, verbose = true, errors = true) => {
  if (proc.stderr.length < 1) {
    verbose ? out.write(` ${'[DONE]\n'.magenta} ${proc.stdout.toString().red}`) : out.write(' [DONE]\n'.magenta);
  } else {
    if(errors) outErr.write(`${'[ERROR]'.red} output: "${proc.stderr}"`);
  }
  return proc;
}

export { git as default };
