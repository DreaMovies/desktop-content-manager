/*videojs(document.querySelector('.video-js'), {
			src: "",
			controls: true,
			autoplay: false,
			preload: 'auto'
		});*/

//https://developers.google.com/cast/docs/styled_receiver

var create = function(element){
	console.log("Create Player");
	document.getElementById('video-player').innerHTML += '<video id="my-player" class="video-js"><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video>';
};

var play = function (path){
	create();

	var options = {
			sources: [{
				type: "video/mp4",
				src: path
			}],
			controls: true,
			"playbackRates": [1, 2]/*,
			chromecast:{
				appId: 'APP-ID',
				metadata: {
					title: 'Title display on tech wrapper',
					subtitle: 'Synopsis display on tech wrapper',
				}
			}*/
		};

	var player = videojs( document.getElementById('my-player'), options, function onPlayerReady() {
		document.getElementById('my-player').parentElement.classList = "video-player show-player";
		videojs.log('Your player is ready!');

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
	player.selectSubtitle();
};

var destroy = function(element){
	console.log("Player Destroyed");
	element.parentElement.classList = "video-player";
	videojs( element ).dispose();
};

module.exports = {
	create: create,
	play: play,
	destroy: destroy
}