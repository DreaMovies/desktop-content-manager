var MovieList 	= function(list){
	link_html = '';
	for (var key in list) {
		link_html += '<div onclick="dreamovie.controler.MovieDetail(\'' + list[key].id + '\')" class="ui card"><div class="dimmable image"><div class="ui dimmer"><div class="content">' +
		'		<a title="' + list[key].id_trakt + '" alt="' + list[key].id_trakt + '">' +
		'			<div class="center"><i class="icon-play-circle icons-hover"></i></div>' +
		'		</a></div></div>' +
		'		<img src="https://dreamovies.tk/' + list[key].img_poster + '">' +
		'		<div class="item-title"><span>' + list[key].id_trakt + '</span></div>' +
		'	</div><div class="extra content"><div class="item-rate left floated"><span class="real-rating">' + list[key].rating + '</span>/10</div></div>' +
		'</div>';
	}
	document.getElementById('dynamic-content').innerHTML = '<div class="ui special five doubling cards show-content">' + link_html + '</div>';
};

var MovieDetail = function(data){
	detail_html = 	'<div class="content-detail">' +
					'	<div class="detail-cover" style="background-image: url(\'https://dreamovies.tk/' + data.img_fanart + '\')"></div>' +
					'	<div class="detail-base ui text container">' +
					'		<img class="detail-poster" src="https://dreamovies.tk/' + data.img_poster + '">' +
					'		<h1 class="ui inverted header">' +
					'       	<div class="sub header">' + data.rating + '</div>' +
					'			Do whatever you want when you want to.' +
					'		</h1>' +
					'		<div class="ui huge primary button">Get Started <i class="right arrow icon"></i></div>' +
					'	</div>' +
					'</div>';
	document.getElementById('dynamic-content').innerHTML = detail_html;
};

var ShowList 	= function(list){
	link_html = '';
	for (var key in list) {
		link_html += '<div onclick="dreamovie.controler.ShowDetail(\'' + list[key].id + '\')" class="ui card"><div class="dimmable image"><div class="ui dimmer"><div class="content">' +
		'		<a title="' + list[key].id_trakt + '" alt="' + list[key].id_trakt + '">' +
		'			<div class="center"><i class="icon-play-circle icons-hover"></i></div>' +
		'		</a></div></div>' +
		'		<img src="https://dreamovies.tk/' + list[key].img_poster + '">' +
		'		<div class="item-title"><span>' + list[key].id_trakt + '</span></div>' +
		'	</div><div class="extra content"><div class="item-rate left floated"><span class="real-rating">' + list[key].rating + '</span>/10</div></div>' +
		'</div>';
	}
	document.getElementById('dynamic-content').innerHTML = '<div class="ui special five doubling cards">' + link_html + '</div>';
};

var ShowDetail 	= function(){

};

module.exports = {
	MovieList: MovieList,
	MovieDetail: MovieDetail,
	ShowList: ShowList,
	ShowDetail: ShowDetail
}