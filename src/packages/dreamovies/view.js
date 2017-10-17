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
	document.getElementById('dynamic-content').innerHTML = '<div class="ui special five doubling cards">' + link_html + '</div>';
};

var MovieDetail = function(data){
	detail_html = 	'<div class="ui inverted vertical masthead center aligned segment">' +
					'    <div class="ui text container">' +
					'      <h1 class="ui inverted header">' +
					'        Imagine-a-Company' +
					'      </h1>' +
					'      <h2>Do whatever you want when you want to.</h2>' +
					'      <div class="ui huge primary button">Get Started <i class="right arrow icon"></i></div>' +
					'    </div>' +
					 ' </div>';
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