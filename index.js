const fs = require("fs");
const https = require('https');
const request = require('request');
const SerpApi = require('google-search-results-nodejs')
const search = new SerpApi.GoogleSearch("api key xd")

const params = {
    q: "request xd",
    tbm: "isch"
};

const callback = function(data) {

    //console.log(data['images_results'][78].original);
    nameArray = [];
    for(i = 0; i <= 100; i++){
        nameArray.push("file"+i+".jpg");
    }

    urlArray = [];
    for(i = 0; i <= 99; i++){
        urlArray.push(data['images_results'][i].original);
    }
    var recursiveDownload = function(urlArray, nameArray, i){
        if (i < urlArray.length) {
            request.get(urlArray[i])                                                                                  
                .on('error', function(err) {console.log(err)} )                                                   
                .pipe(fs.createWriteStream(nameArray[i]))                                                                 
                .on('close', function () { recursiveDownload (urlArray, nameArray, i+1); });
        }
    }
    recursiveDownload(urlArray, nameArray, 0);
  };
  
search.json(params, callback);
    