require 'httparty'
class WelcomesController < ApplicationController



  # GET /welcomes
  # GET /welcomes.json
  def index
@response = HTTParty.get("https://api.heroku.com/apps/pure-beach-57030/builds",
    :headers => {'Accept' => 'application/vnd.heroku+json; version=3',
    "Content-Type" => "application/json",
            "Authorization" => "Bearer e57a8130-c699-4c2b-b152-4b52be8badc7"})
@heroku_commit = @response.last['source_blob']['version']
  end

  # GET /welcomes/1
  # GET /welcomes/1.json

end
