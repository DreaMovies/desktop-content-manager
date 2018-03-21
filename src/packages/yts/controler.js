var YTS_Search = function(){

	var url, limit, page, quality, minimum_rating, query_term, genre, sort_by, order_by, with_rt_ratings;
	limit = 20; //Integer between 1 - 50 (inclusive) The limit of results per page that has been set
	page = 1; //Integer (Unsigned)	Used to see the next page of movies, eg limit=15 and page=2 will show you movies 15-30
	quality = "All"; //String (720p, 1080p, 3D)	Used to filter by a given quality
	minimum_rating = 0; //Integer between 0 - 9 (inclusive)	Used to filter movie by a given minimum IMDb rating
	query_term = "0"; //String	Used for movie search, matching on: Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code
	genre = "All"; //Action	Adventure	Animation	Biography Comedy	Crime	Documentary	Drama Family	Fantasy	Film-Noir	Game-Show History	Horror	Music	Musical Mystery	News	Reality-TV	Romance Sci-Fi	Sport	Talk-Show	Thriller War	Western
	sort_by = "date_added"; //String (title, year, rating, peers, seeds, download_count, like_count, date_added)	Sorts the results by choosen value
	order_by = "desc"; //String (desc, asc)	Orders the results by either Ascending or Descending order
	with_rt_ratings = false; //Boolean Returns the list with the Rotten Tomatoes rating included

	url = "https://yts.ag/api/v2/list_movies.json?limit="+limit+"&page="+page+"&quality="quality"&minimum_rating="+minimum_rating+"&query_term="+query_term+"&genre="+genre+"&sort_by="+sort_by+"&order_by="+order_by+"&with_rt_ratings="+with_rt_ratings+"";

	function ajax_get_json(id){
		console.log(id);
		var results = document.getElementById("results");
		$.getJSON('https://yts.ag/api/v2/list_movies.json?minimum_rating=8&page=1&limit=50', function(yts_data) {
			//yts_data is the JSON string
			results.innerHTML = "";
			i=0;
			for(var obj in yts_data["data"]["movies"]){
				// document.write(i);
				// document.write(yts_data["data"]["movies"][0]["medium_cover_image"]);
				results.innerHTML += "<a href='index.html?hash="+yts_data["data"]["movies"][i]["torrents"][0]["hash"]+"&title="+yts_data["data"]["movies"][i]["title_long"]+"'><img src='"+yts_data["data"]["movies"][i]["medium_cover_image"]+"'<hr /></a>";
				i++;
			}

		});


		results.innerHTML = "requesting...";
	}
};

var external = function(){
	util_tools.createLoading();
	console.log("External Link Request");
	freedom.view.ExternalLink();
};

var torrentStart = function(){
	util_tools.createLoading();
	console.log("Torrent Link/file Request");
	freedom.view.TorrentView();
};

var OpenTorrent = function(){
	var magnetURI = document.getElementById('magnetic-link').value;

	util_tools.createLoading();

	console.log("Torrent Link/file Loading");


	var download_html = '<div id="hero">' +
    '  <div id="output">' +
    '    <div id="progressBar"></div>' +
    '  </div>' +
    '  <!-- Statistics -->' +
    '  <div id="status">' +
    '    <div>' +
    '      <span class="show-leech">Downloading </span>' +
    '      <span class="show-seed">Seeding </span>' +
    '      <code>' +
    '        <a id="torrentLink" href="https://webtorrent.io/torrents/sintel.torrent">sintel.torrent</a>' +
    '      </code>' +
    '      <span class="show-leech"> from </span>' +
    '      <span class="show-seed"> to </span>' +
    '      <code id="numPeers">0 peers</code>.' +
    '    </div>' +
    '    <div>' +
    '      <code id="downloaded"></code>' +
    '      of <code id="total"></code>' +
    '      — <span id="remaining"></span><br/>' +
    '      &#x2198;<code id="downloadSpeed">0 b/s</code>' +
    '      / &#x2197;<code id="uploadSpeed">0 b/s</code>' +
    '    </div>' +
    '    <span id="file-url"></span>' +
    '  </div>' +
    '</div>';


	document.getElementById('dynamic-content').innerHTML = '<div class="ui show-content external-content">' + download_html + '</div>';

	var torrentId = magnetURI; //'https://webtorrent.io/torrents/sintel.torrent'; // //https://zoink.ch/torrent/Marvels.Agents.of.S.H.I.E.L.D.S05E12.HDTV.x264-SVA[eztv].mkv.torrent

	var client = new WebTorrent();

	// HTML elements
	var $body = document.body;
	var $progressBar = document.getElementById('progressBar');
	var $numPeers = document.getElementById('numPeers');
	var $downloaded = document.getElementById('downloaded');
	var $total = document.getElementById('total');
	var $remaining = document.getElementById('remaining');
	var $uploadSpeed = document.getElementById('uploadSpeed');
	var $downloadSpeed = document.getElementById('downloadSpeed');

client.on('error', function (err) {
	console.error('ERROR: ' + err.message)
});

	// Download the torrent
	client.add(torrentId, function (torrent) {

		// Torrents can contain many files. Let's use the .mp4 file
		var file = torrent.files.find(function (file) {
			if( file.name.endsWith('.mp4') ){
				return file.name.endsWith('.mp4');
			} else if( file.name.endsWith('.mkv') ){
				return file.name.endsWith('.mkv');
			}
		});

		// Stream the file in the browser
		file.appendTo('#output');

		file.getBlobURL(function (err, url) {
			if (err) throw err;
			var a = document.createElement('a');
			a.download = file.name;
			a.href = url;
			a.title = file.path;
			a.textContent = 'Download ' + file.name;
			document.getElementById("file-url").appendChild(a);
		});
		
		torrent.on('ready', function () {
			util_tools.createNotification('Download Started', torrent.name);
		});
			
		torrent.on('warning', function (err) {
			console.log(err);
		});
		torrent.on('error', function (err) {
			console.log(err);
		});

		// Trigger statistics refresh
		torrent.on('done', onDone);
		setInterval(onProgress, 500);
		onProgress();


		// Human readable bytes util
		function prettyBytes(num) {
			var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
			if (neg)
				num = -num;
			if (num < 1)
				return (neg ? '-' : '') + num + ' B';
			exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
			num = Number((num / Math.pow(1000, exponent)).toFixed(2));
			unit = units[exponent];
			return (neg ? '-' : '') + num + ' ' + unit;
		}
		// Statistics
		function onProgress () {
			// Peers
			$numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers');

			// Progress
			var percent = Math.round(torrent.progress * 100 * 100) / 100;
			$progressBar.style.width = percent + '%';
			$downloaded.innerHTML = prettyBytes(torrent.downloaded);
			$total.innerHTML = prettyBytes(torrent.length);

			// Remaining time
			var remaining;
			if (torrent.done) {
				remaining = 'Done.';
			} else {
				remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize();
				remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.';
			}
			$remaining.innerHTML = remaining;

			// Speed rates
			$downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s';
			$uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s';
		}
		function onDone () {
			$body.className += ' is-seed';
			onProgress();
			util_tools.createNotification('Download Complete', torrent.name);
		}

		$("#dynamic-content").on('DOMNodeRemoved', function(e) {
			console.log(e.target, ' was removed');
			torrent.destroy(function(){
				console.log("torrent totally destroyed");
			});
		});
		//destroy Torrent
		

	});


	//freedom.view.TorrentView();
}

var torrentStream = require('torrent-stream');

var OpenTorrent_stream = function(){
	var magnetURI = document.getElementById('magnetic-link').value;

	util_tools.createLoading();

	console.log("Torrent Link/file Loading");



	var engine = torrentStream(magnetURI);

	engine.on('ready', function() {
		engine.files.forEach(function(file) {
			console.log('filename:', file.name);
			var stream = file.createReadStream();
			// stream is readable stream to containing the file content
		});
	});
}


module.exports = {
	external: external,
	OpenLink: OpenLink,
	torrentStart: torrentStart,
	OpenTorrent: OpenTorrent,
	OpenTorrent_stream: OpenTorrent_stream
}