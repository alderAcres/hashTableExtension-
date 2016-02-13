/**
* Update package.json with dependencies from assessments-archive
*/

const fs = require('fs');
const request = require('request');
const GithubApi = require('./util/GithubApi');

const org = 'CodesmithLLC';

var github = new GithubApi({ org: org, token: process.env.GITHUB_ACCESS_TOKEN });

github.fileContents({ path: 'package.json', repo: 'assessments-archive' }, (err, response, body) => {
  
  var buf = new Buffer(body.content, 'base64');
  var newPackage = JSON.parse(buf);
  
  var package = require(`${__dirname}/../package.json`);
  Object.assign(package.dependencies, newPackage.dependencies);
  Object.assign(package.scripts, newPackage.scripts);
  
  var filepath = `${__dirname}/../package.json`;
  
  fs.writeFile(filepath, JSON.stringify(package, null, 2), (err) => {
    if (err) throw err;
    
    // done
  });
  
});
