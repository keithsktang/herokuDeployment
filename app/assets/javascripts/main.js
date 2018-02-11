var app = angular.module('main', []);
app.controller('deployment', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  $scope.init = function() {
    $scope.key = document.getElementById('key').innerText;
    console.log($scope.key)
  }
  $timeout(function() {
    $http.get("https://api.heroku.com/apps/pure-beach-57030/builds", {
      headers: {
        'Accept': 'application/vnd.heroku+json; version=3',
        "Content-Type": "application/json",
        "Authorization": $scope.key
      }
    }).then(function(response) {
      $scope.herokuCommit = response.data[response.data.length - 1].source_blob.version;
    }).finally(function() {
      $http.get("https://api.github.com/repos/keithsktang/herokuDeployment/commits", {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          "Content-Type": "application/json"
          // 'User-Agent': 'keithsktang'
        }
      }).then(function(response) {
        $scope.githubCommit = response.data[0].sha;
      }).finally(function() {
        $scope.githubCommit === $scope.herokuCommit ? $scope.newVersion = false : $scope.newVersion = true
      })
    })
  }, 10);

  // $scope.deploy = function(version){
  //   $http.get(`https://vne365avwi.execute-api.us-east-1.amazonaws.com/api/${version}`).then(function(response){
  //     $scope.awsResponse = response;
  //     console.log(response)
  //   })
  // }

}])
