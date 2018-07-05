/*videojs(document.querySelector('.video-js'), {
			src: "",
			controls: true,
			autoplay: false,
			preload: 'auto'
		});*/

//https://developers.google.com/cast/docs/styled_receiver

var lang_codes = {
	'en' : "English",
	'fr' : "Francais",
	'pt' : "Português",
	'de' : "Deutsh",
	'it' : "Italian",
	'es' : "Spanish",
	'el' : "Greek",
	'pl' : "Polish"
};

var create = function(element){
	console.log("Create Player");
	document.getElementById('video-player').innerHTML += '<video id="my-player" class="video-js"><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video>';
};

var play = function (path){
	create();

	var subs_folder_path = path.substr(0, path.lastIndexOf("/")) + "/subs/vtt/";
	var subtitles = [];

	if (fs.existsSync(subs_folder_path)){
		var sub_list = fs.readdirSync(subs_folder_path);
		console.log(sub_list);
		var lang_codes = {
			'en' : "English",
			'fr' : "Francais",
			'pt' : "Português",
			'de' : "Deutsh",
			'it' : "Italian",
			'es' : "Spanish",
			'el' : "Greek",
			'pl' : "Polish"
		};
		//if (err) throw  err;
		
		for (let file of sub_list) {
			//console.log(file);
			var lang = file.split("_")[0];

			subtitles.push({ 
				src: subs_folder_path + file,
				kind: 'captions',
				srclang: lang,
				label: lang_codes[lang]
			});
			
		}
	}
	var options = {
		sources: [{
			type: "video/mp4",
			src: path
		}],
		controls: true,
		"playbackRates": [1, 2],
		/*chromecast:{
			appId: 'APP-ID',
			metadata: {
				title: 'Title display on tech wrapper',
				subtitle: 'Synopsis display on tech wrapper',
			}
		}*/
		tracks: subtitles
	};
	startPlayer(options);
};

var startPlayer = function(options){
	var player = videojs( document.getElementById('my-player'), options, function onPlayerReady() {

		document.getElementById('my-player').parentElement.classList = "video-player show-player";
		videojs.log('Your player is ready!');
		/*this.hotkeys({
			alwaysCaptureHotkeys: true
		});*/

		// In this context, `this` is the player that was created by Video.js.
		this.play();

		// to close Player
		document.getElementsByClassName("close-player")[0].addEventListener("click", (e) => {
			destroy(document.getElementById('my-player'));
		});

		// How about an event listener?
		this.on('ended', function() {
			videojs.log('Awww...over so soon?!');
			destroy(document.getElementById('my-player'));
		});
	});
	//player.selectSubtitle();
};

var destroy = function(element){
	console.log("Player Destroyed");
	document.getElementById('video-player').classList = "video-player";
	videojs( element ).dispose();
};

module.exports = {
	create: create,
	play: play,
	destroy: destroy
}