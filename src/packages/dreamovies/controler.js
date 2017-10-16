var dreamovies_config = {
	apiV: "1",
	url: "https://dreamovies.tk/v",
	apiKey: ""
}

var requestUrl = "https://dreamovies.tk/api/movies";
const request_options = {  
    url: requestUrl,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'dreamovies-content-manager'
    }
};


var UserInfo 	= function(){

};

var Login 		= function(){

};

var MovieList 	= function(){

	requestUrl = dreamovies_config.url + dreamovies_config.apiV + "/api/movies";
console.log(requestUrl);
	/*, function(err, res, body) {  
		let json = JSON.parse(body);
		console.log(json);
	})*/
	request(requestUrl, function (error, response, body) {
		dreamovie.view.MovieList( JSON.parse(body).data );
		util_tools.showDynamicContent("dynamic-content");
	});
};

var MovieDetail = function(){

};

var ShowList 	= function(){

};

var ShowDetail 	= function(){

};

var MovieSeen 	= function(){

};

var EpisodeSeen = function(){

};




module.exports = {
	UserInfo: UserInfo,
	Login: Login,
	MovieList: MovieList,
	MovieDetail: MovieDetail,
	ShowList: ShowList,
	ShowDetail: ShowDetail,
	MovieSeen: MovieSeen,
	EpisodeSeen: EpisodeSeen
}