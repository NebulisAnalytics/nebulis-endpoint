const readline = require('readline');

const prompter = (sayStuff, processIn) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(sayStuff, (answer) => {
    rl.close();
    processIn(answer);
  });
};

const getDetails = () => {
  const out = process.stdout;

  out.write('\nWelcome to Nebulis Analytics 🔥');

  prompter('\n\nPlease enter your full name [John Doe]:', () => {
    prompter('\nWe have detected your github username is <>\nPress enter to confirm [John Doe]:', () => {
      prompter('\nWhat is your team members full name? []:', () => {
        prompter('\nWhat is your team members github username? []:', () => {});
      });
    });
  });

  out.write('\n');
}

export { getDetails as default };