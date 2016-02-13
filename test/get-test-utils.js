const path = require('path');
const fs = require('fs');
const async = require('async');
const GithubApi = require('./util/GithubApi');

const commit = process.env.TRAVIS_COMMIT;
const pull = process.env.TRAVIS_PULL_REQUEST;
const org = 'CodesmithLLC';
const repo = path.dirname(__dirname).split('/').slice(-1)[0];
const lintFileName = '.eslintrc';

var github = new GithubApi({ org: org, token: process.env.GITHUB_ACCESS_TOKEN });

async.series([
  (next) => {
    copyFile('test/util/remote-test.js', next);
  },
  (next) => {
    copyFile('test/util/report.js', next);
  },
  (next) => {
    copyFile('test/util/dynamodbDoc.js', next);
  },
  (next) => {
    copyFile('.eslintrc', next);
  }
], (err, results) => {
  if (err) throw err;
});

function copyFile(path, next) {
  github.fileContents({ path: path, repo: 'assessments-archive' }, (err, res, body) => {
    var buf = new Buffer(body.content, 'base64');
    
    var filepath = `${__dirname}/${body.name}`;
    
    fs.writeFile(filepath, buf, next);
  });
}
