#!/usr/bin/env node
const fs = require('fs');
const { types, scopes } = require('../.cz-config.js');

console.log('🐟🐟🐟 Validating git commit message 🐟🐟🐟');

// let mergeMessage;

// try {
//   mergeMessage = fs.readFileSync('.git/MERGE_MSG', 'utf-8').trim();
// } catch {}

// if (mergeMessage) {
//   console.log('[Error]: Please, oh please, use git pull --rebase');
//   process.exit(1);
// }

const gitMessage = process.argv[2] || fs.readFileSync('.git/COMMIT_EDITMSG', 'utf-8').trim();
const allowedTypes = types.map(type => type.value);
const allowedScopes = scopes.map(scope => scope.name);
const commitMsgRegex = `(${allowedTypes.join('|')})\\((${allowedScopes.join('|')})\\):\\s(([a-z0-9:\-\s])+)`;
const matchCommit = new RegExp(commitMsgRegex, 'g').test(gitMessage);
const matchRevert = /Revert/gi.test(gitMessage);
const matchRelease = /Release/gi.test(gitMessage);
const exitCode = +!(matchRelease || matchRevert || matchCommit);

if (exitCode === 0) {
  console.log('Commit ACCEPTED 👌');
} else {
  console.log(
    '[Error]: Ho no! 😦 Your commit message: \n' +
      '-------------------------------------------------------------------\n' +
      gitMessage +
      '\n-------------------------------------------------------------------' +
      '\n\n 👉️ Does not follow the commit message convention specified in the CONTRIBUTING.MD file.'
  );
  console.log('\ntype(scope): subject \n BLANK LINE \n body');
  console.log('\n');
  console.log(`possible types: ${allowedTypes.join('|')}`);
  console.log(`possible scopes: ${allowedScopes.join('|')} (if unsure use "core")`);
  console.log('\nEXAMPLE: \n' + 'feat(nx): add an option to generate lazy-loadable modules\n');

  process.exit(exitCode);
}
