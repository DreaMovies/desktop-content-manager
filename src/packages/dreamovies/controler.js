var dreamovies_config = {
	apiV: "1",
	url: "https://dreamovies.tk/v",
	apiKey: ""
};

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
	util_tools.createLoading();
	requestUrl = dreamovies_config.url + dreamovies_config.apiV + "/api/movies";
	request(requestUrl, function (error, response, body) {
		dreamovie.view.MovieList( JSON.parse(body).data );
		//util_tools.showDynamicContent("dynamic-content");
	});
};

var MovieDetail = function(id){
	util_tools.createLoading();
	console.log("movie Detail " + id);
	requestUrl = dreamovies_config.url + dreamovies_config.apiV + "/api/movie/" + id ;
	request(requestUrl, function (error, response, body) {

		console.log(body);
		dreamovie.view.MovieDetail( JSON.parse(body)[0] );
		//util_tools.showDynamicContent("dynamic-content");
	});
};

var ShowList 	= function(){
	util_tools.createLoading();
	requestUrl = dreamovies_config.url + dreamovies_config.apiV + "/api/shows";
	request(requestUrl, function (error, response, body) {
		dreamovie.view.ShowList( JSON.parse(body).data );
		//util_tools.showDynamicContent("dynamic-content");
	});
};

var ShowDetail 	= function(){
	util_tools.createLoading();
	console.log("Show Detail " + id);
	requestUrl = dreamovies_config.url + dreamovies_config.apiV + "/api/show/" + id ;
	request(requestUrl, function (error, response, body) {

		console.log(body);
		dreamovie.view.ShowDetail( JSON.parse(body) );
		//util_tools.showDynamicContent("dynamic-content");
	});
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