function getRepoContributors(repoOwner, repoName, cb) {

  var request = require('request');
  var GITHUB_USER = "davidjeffrey";
  var GITHUB_TOKEN = "3bfe02dd19ea8e5ad124b7ea94cc3c19a2af412c";
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var fs = require('fs');

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
  };


   request(options, function (error, response, body) {


    let parsedBody = JSON.parse(body)

    let avatarUrls = parsedBody.map(item => item.avatar_url)


  })

}

function downloadImageByURL(url, filePath) {

var request = require('request');
var fs = require('fs');

request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath));

}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });





