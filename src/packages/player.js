module.exports = {
	/*videojs(document.querySelector('.video-js'), {
				src: "",
				controls: true,
				autoplay: false,
				preload: 'auto'
			});*/

	play: function (path){
		var options = {
			src: path;
		};
		 
		var player = videojs(document.getElementById('my-player'), options, function onPlayerReady() {
			videojs.log('Your player is ready!');

			// In this context, `this` is the player that was created by Video.js.
			this.play();

			// How about an event listener?
			this.on('ended', function() {
				videojs.log('Awww...over so soon?!');
			});
		});
	}
}