var app = angular.module('main', []);
app.controller('deployment', function($scope, $http, $timeout) {
  $scope.name = "name"
  $http.get("https://api.heroku.com/apps/pure-beach-57030/builds", {
    headers: {
      'Accept': 'application/vnd.heroku+json; version=3',
      "Content-Type": "application/json",
      "Authorization": "Bearer e57a8130-c699-4c2b-b152-4b52be8badc7"
    }
  }).then(function(response) {
    $scope.herokuCommit = response.data[response.data.length - 1].source_blob.version;
  }).finally(function(){
    $http.get("https://api.github.com/repos/keithsktang/herokuDeployment/commits", {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        "Content-Type": "application/json"
        // 'User-Agent': 'keithsktang'
      }
    }).then(function(response) {
      $scope.githubCommit = response.data[0].sha;
    }).finally(function(){
      $scope.githubCommit === $scope.herokuCommit ? $scope.newVersion = false : $scope.newVersion = true
    })
  })
  $scope.deploy = function(version){
    $http.get(`https://vne365avwi.execute-api.us-east-1.amazonaws.com/api/${version}`).then(function(response){
      $scope.awsResponse = response;
    })
  }


  // @heroku_res = HTTParty.get("https://api.heroku.com/apps/pure-beach-57030/builds",
  //     :headers => {'Accept' => 'application/vnd.heroku+json; version=3',
  //     "Content-Type" => "application/json",
  //             "Authorization" => "Bearer e57a8130-c699-4c2b-b152-4b52be8badc7"})
  // @heroku_commit = @heroku_res.last['source_blob']['version']
  // @git_res = HTTParty.get("https://api.github.com/repos/keithsktang/herokuDeployment/commits",
  //     :headers => {'Accept' => 'application/vnd.github.jean-grey-preview+json',
  //                   'User-Agent' => 'keithsktang'})
  // @git_commit = @git_res.first['sha']
  //
  // @new_version if @git_commit != @heroku_commit
})
