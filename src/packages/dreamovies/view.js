var MovieList 	= function(list){
	console.table(list);
	link_html = '';
	for (var key in list) {
		link_html += '<div class="ui card"><div class="dimmable image"><div class="ui dimmer"><div class="content">' +
		'		<a href="/movies/detail/' + list[key].id + '" title="' + list[key].id_trakt + '" alt="' + list[key].id_trakt + '">' +
		'			<div class="center"><i class="icon-play-circle icons-hover"></i></div>' +
		'		</a></div></div>' +
		'		<img src="https://dreamovies.tk/' + list[key].img_poster + '">' +
		'		<div class="item-title"><span>' + list[key].id_trakt + '</span></div>' +
		'	</div><div class="extra content"><div class="item-rate left floated"><span class="real-rating">' + list[key].rating + '</span>/10</div></div>' +
		'</div>';
	}
	document.getElementById('dynamic-content').innerHTML = '<div class="ui special five doubling cards">' + link_html + '</div>';
};

var MovieDetail = function(){

};

var ShowList 	= function(){

};

var ShowDetail 	= function(){

};

module.exports = {
	MovieList: MovieList,
	MovieDetail: MovieDetail,
	ShowList: ShowList,
	ShowDetail: ShowDetail
}