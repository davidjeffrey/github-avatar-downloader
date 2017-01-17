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

    // let result = parsedBody.map(item => {
    //   return {
    //     login: item.login,
    //     avatar_url: item.avatar_url
    //   }
    // })

    console.log(parsedBody)

    let result = parsedBody.map(item => ({
      login: "./avatars/" + item.login + ".jpg",
      avatar_url: item.avatar_url
    }))

    console.log(result)
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

var request = require('request');
var fs = require('fs');

request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath));

}







