const spawn = require('child_process').spawnSync;

const GIT_DIR = '--git-dir=.nebugit';
const WORK_TREE = '--work-tree=.';

const git = {
  init: () => { return handler(spawn('git', [GIT_DIR, WORK_TREE, 'init'])); },
  status: () => { return handler(spawn('git', [GIT_DIR, WORK_TREE, 'status']), false, false); },
  commit: () => { return handler(spawn('git', [GIT_DIR, WORK_TREE, 'commit', '-m', 'date'])); },
  push: () => { return handler(spawn('git', [GIT_DIR, WORK_TREE, 'push'])); },
};

const handler = (proc, verbose = true, errors = true) => {
  const out = process.stdout;
  const outErr = process.stderr;
  if (proc.stderr.length < 1) {
    verbose ? out.write(' [DONE]\n'.magenta) : out.write(' [DONE]\n'.magenta + proc.stdout);
  } else {
    if(errors) outErr.write(`${'!!!NEBULIS ERROR!!!'.red} ${proc.stderr}`);
  }
  return proc;
}

export { git as default };
