console.log(`Merging with insecure token.`);

const path = require('path');
const GithubApi = require('./util/GithubApi');
const commit = process.env.TRAVIS_COMMIT;
const pull = process.env.TRAVIS_PULL_REQUEST;
const org = 'CodesmithLLC';
const repo = path.dirname(__dirname).split('/').slice(-1)[0];

github = new GithubApi({ org: org, token: process.env.MERGE_TOKEN });

github.pullInfo({ repo: repo, pull: pull }, (err, res, body) => {
  
  if (body.user.login !== body.base.ref) {
    console.log('Must pull to correct branch name. Exiting.');
    process.exit(1);
  }
  
  github.mergePullRequest({ repo: repo, sha: body.head.sha, pull: pull, message: `Merging ${commit}` }, (err, res, body) => {
    
    if (body && body.merged) {
      console.log('Pull request merged. Exiting.');
      process.exit(0);  
    } else {
      console.log('Could not merge for some reason: ', body);
      process.exit(1);
    }
    
  });
  
});
