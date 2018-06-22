var OpenLink = function(){

	var link = document.getElementById('external-link').value;
	var type = document.getElementById('external-type').value;
	
	if (!/^(f|ht)tps?:\/\//i.test(link)) {
		link = "http://" + link;
	}

	util_tools.createLoading();
	console.log("External Link loading: " + link);
	freedom.view.ExternalView( link, type );
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
	require('webtorrent-hybrid')
	var magnetURI = document.getElementById('magnetic-link').value;

	util_tools.createLoading();

	console.log("Torrent Link/file Loading");


	var download_html = '<div id="hero">' +
    '  <div id="output">' +
    '    <div id="progressBar"></div>' +
    '    <video id="video_stream" controls></video>' +
    '  </div>' +
    '  <!-- Statistics -->' +
    '  <div id="status">' +
    '    <div>' +
    '      <span class="show-leech">Downloading </span>' +
    '      <span class="show-seed">Seeding </span>' +
    '      <code>' +
    '        <a id="torrentLink"></a>' +
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

	/*/ Select the node that will be observed for mutations
	var targetNode = document.getElementById('output');
	// Options for the observer (which mutations to observe)
	var config = { attributes: false, childList: true };
	// Create an observer instance linked to the callback function
	var observer = new MutationObserver(function(mutations) {
		if (!document.body.contains(element)) {
			
			// Later, you can stop observing
			observer.disconnect();
		}
	});
	// Start observing the target node for configured mutations
	observer.observe(targetNode, config);*/

	//https://webtorrent.io/docs
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
	client.add(torrentId, {path: "C:/Users/user/Documents/Download/torrent"}, function (torrent) {

		var file_index = 0;
		// create HTTP server for this torrent
		var server = torrent.createServer();
		server.listen(8888); // start the server listening to a port

		// Torrents can contain many files. Let's use the .mp4 file
		var file = torrent.files.find(function (file) {
			if( file.name.endsWith('.mp4') ){
				console.log(file);
				//file_index = file;
				return file.name.endsWith('.mp4');
			} else if( file.name.endsWith('.mkv') ){
				console.log(file);
				return file.name.endsWith('.mkv');
			}
			file_index++;
		});

		// Stream the file in the browser
		//file.createReadStream()
		file.renderTo('#video_stream');
		// Stream the file in the browser
        file.appendTo('#output', function (err, elem) {
			if (err) throw err // file failed to download or display in the DOM
			console.log('New DOM node with the content', elem)
		});


		// visit http://localhost:<port>/ to see a list of files
		// access individual files at http://localhost:<port>/<index> where index is the index
		// in the torrent.files array
		//document.getElementById('video_stream').setAttribute("src", "http://localhost:8888/" + file_index);

		document.getElementById('torrentLink').innerHTML = file.name;

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
			//server.close();
			//client.destroy();
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

		/*$("#dynamic-content").on('DOMNodeRemoved', function(e) {
			console.log(e.target, ' was removed');
			torrent.destroy(function(){
				console.log("torrent totally destroyed");
			});

			//server.close();
			//client.destroy();
		});*/

		function destroyStream(e){
			server.close();
			client.destroy();
			console.log("destroyed");
			document.getElementsByClassName('menu-list')[0].removeEventListener("click", destroyStream());
		}
		//destroy Torrent
		//document.getElementsByClassName('menu-list')[0].addEventListener("click", destroyStream() );

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