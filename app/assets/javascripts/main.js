// Using AngularJS
var app = angular.module('main', []);
app.controller('deployment', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  // initialize with getting the Heroku Token from config vars
  $scope.init = function() {
    $scope.key = document.getElementById('key').innerText;
  }
  // set eventloop til document loaded
  $timeout(function() {
    // Retrieving Heroku Build Version
    $http.get("https://api.heroku.com/apps/pure-beach-57030/builds", {
      headers: {
        'Accept': 'application/vnd.heroku+json; version=3',
        "Content-Type": "application/json",
        "Authorization": $scope.key
      }
    }).then(function(response) {
      // setting Heroku Build Version
      $scope.herokuCommit = response.data[response.data.length - 1].source_blob.version;
    }).finally(function() {
      // Retrieving Github Commit hash
      $http.get("https://api.github.com/repos/keithsktang/herokuDeployment/commits", {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          "Content-Type": "application/json"
        }
      }).then(function(response) {
        $scope.githubCommit = response.data[0].sha;
      }).finally(function() {
        //comparing two versions
        $scope.githubCommit === $scope.herokuCommit ? sameVersion(true) : diffVersion(true);
      })
    })
  }, 0);
  //deploy to heroku
  $scope.deploy = function(version) {
    awsDeploy(version)
  }
  $scope.tryAgain = function() {
    // deploy to heroku with a different build version number
    awsDeploy('633ac4d6831057f8c7b060997b8778105660bf00')
  }

  function awsDeploy(version) {
    $('.message').css('opacity', '0');
    $('.deploy').hide();
    $('.fa-sync').show();
    $http.get('https://vne365avwi.execute-api.us-east-1.amazonaws.com/api/' + version).then(function(response) {
      $scope.awsStatus = response.status;
      $scope.awsResponse = response.data;
      $scope.herokuCommit = $scope.awsResponse.source_blob.version;
      $scope.githubCommit === $scope.herokuCommit ? sameVersion(false) : diffVersion(false);
      $('.fa-sync').hide();
      $('.awsResponse').show();
    })
  }

  function sameVersion(changeState) {
    $('.github').removeClass('diff');
    if (changeState) $scope.newVersion = false;
  }

  function diffVersion(changeState) {
    $('.github').addClass('diff');
    if (changeState) $scope.newVersion = true;
  }

}])
