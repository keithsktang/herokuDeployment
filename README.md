# Heroku Deployment app

> Frontend application as Chalice Deployment app trigger


-----


### Purpose - create a Frontend application to compare the current Github commit and Heroku commit.  
### If the two versions are not the same, display a `Deploy Now` button to trigger a Lambda function that call an api endpoint for Heroku build.


- Rails for apps backend for rapid deployment.
- AngularJS for frontend due to CDN integration.
- It should make a http get request to Heroku and Github and retrive the current commit hash.
- It should compare versions and display a ` Deploy Now` button, if the two versions are different.
- It should allow user testing even if there isn't a new github commit.
  - by allowing user to change the version number of current Heroku build, thus allowing the build process to redeploy even without a new git commit.



___________________________
