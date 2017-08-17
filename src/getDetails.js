const readline = require('readline');

const prompter = (sayStuff, processIn, defaultAnswer) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(sayStuff, (answer) => {
    rl.close();
    if (answer.length < 1 && defaultAnswer) processIn(defaultAnswer);
    else if (answer.length < 1) prompter(sayStuff, processIn, defaultAnswer);
    else processIn(answer);
  });
};

const config = require(process.cwd() + '/.nebulis.json');
const out = process.stdout;

const getDetails = (GitName, project) => {
  config.owners = [];

  const owner = {};

  out.write('\nWelcome to Nebulis Analytics 🔥\n');

  prompter('\nPlease enter your full name [ex: John Doe]:', (res) => {
    owner.fullName = res
    prompter('\nWe have detected your github username is ' + GitName + '\nPress enter to confirm [' + GitName + ']:', (res) => {
      owner.username = res;
      config.owners.push(owner);
      checkForNextMember();
    }, owner);
  });
};
const checkForNextMember = () => {
  prompter('\nDo you have any additional team members? [Y/n]:', (res) => {
    if (res === 'Y') {
      getNextMember();
    } else if (res === 'n') exit();
    else checkForNextMember();
  });
}

const getNextMember = () => {
  const owner = {};
  prompter('\nWhat is your team members full name? []:', (res) => {
    owner.fullName = res
    prompter('\nWhat is your team members github username? []:', (res) => {
      owner.username = res;
      config.owners.push(owner);
      checkForNextMember();
    });
  });
};

const exit = () => {
  console.log(config);
  console.log('exiting');
}

export { getDetails as default };