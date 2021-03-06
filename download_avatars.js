if (process.argv.length < 4) {
  console.log("Error Will Robinson! Not enough arguements!")
  return;
}

var request = require('request');
var GITHUB_USER = "davidjeffrey";
var GITHUB_TOKEN = "3bfe02dd19ea8e5ad124b7ea94cc3c19a2af412c";
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function (error, response, body) {

  let parsedBody = JSON.parse(body)

  let result = parsedBody.map(item => ({
    login: "./avatars/" + item.login + ".jpg",
    avatar_url: item.avatar_url
  }))

  return cb(error, result)

  })
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  if (err !== null) {
    console.log("Errors:", err);
  }
  result.forEach(function(item) {
    downloadImageByURL(item.avatar_url, item.login)
  })
});

function downloadImageByURL(url, filePath) {

request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath));
};







