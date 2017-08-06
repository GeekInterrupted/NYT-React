//include axios package for performing HTTP requests
import axios from "axios";

//NYT API Key
const nytAPI = "40928ac7aab54461be81c06b0404c6a0";

// Helper Functions
var helpers = {

	runQuery: function(topic, startYear, endYear){
return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
    params: {
        "api-key": nytAPI,
        "q": topic,
        "startYear": startYear,
        "endYear": endYear
    }
}).then(function(response){

				var newResults = [];
				var fullResults = response.data.response.docs;
				var counter = 0;

				//Gets first 5 articles that have all 3 components
				for(var i = 0; i < fullResults.length; i++){

					if(counter > 4) {
						return newResults;
					}

					if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url) {
						newResults.push(fullResults[counter]);
						counter++;
					}
				}

				return newResults;
		})

	},


	// This function posts saved articles to our database.
	postArticle: function(title, date, url){

		axios.post('/api/saved', {title: title, date: date, url: url})
		.then(function(results){

			console.log("Candygram for Mongo!- saved to DB");
			return(results);
		})
	}

}


// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;