require 'httparty'
require 'time'
class WelcomesController < ApplicationController



  # GET /welcomes
  # GET /welcomes.json
  def index
    @heroku_res = HTTParty.get("https://api.heroku.com/apps/pure-beach-57030/builds",
        :headers => {'Accept' => 'application/vnd.heroku+json; version=3',
        "Content-Type" => "application/json",
                "Authorization" => "Bearer e57a8130-c699-4c2b-b152-4b52be8badc7"})
    @heroku_commit = @heroku_res.last['source_blob']['version']
    @git_res = HTTParty.get("https://api.github.com/repos/keithsktang/herokuDeployment/commits",
        :headers => {'Accept' => 'application/vnd.github.jean-grey-preview+json',
                      'User-Agent' => 'keithsktang'})
    @git_commit = @git_res.first['sha']

    @new_version if @git_commit != @heroku_commit  

  end

  # GET /welcomes/1
  # GET /welcomes/1.json

end
