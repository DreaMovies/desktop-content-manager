

module.exports = {
}

/*
https://github.com/MedZed/Electron-Torrent-Stream
movie_search.html



<!DOCTYPE html>
<html>
<head>
	<script>
	window.$ = window.jQuery = require('./jQuery.js');
	</script>

<script>
function getQueryVariable(variable)
{
		 var query = window.location.search.substring(1);
		 var vars = query.split("&");
		 for (var i=0;i<vars.length;i++) {
						 var pair = vars[i].split("=");
						 if(pair[0] == variable){return pair[1];}
		 }
		 return(false);
}
</script>
<title>parser</title>
<style media="screen">
  body{text-align:center;
      background-color: #000000;
      color:#ffffff;
      font-family: helvetica;
    }
  img{border:5px solid #ffffff;
      }</style>
</head>
<body>

<div id="search">
	<input id="search_key" type="text">
	<a id="Action" href="#">Action</a>
	<a id="Adventure" href="#">Adventure</a>
	<a id="Animation" href="#">Animation</a>
	<a id="Biography" href="#">Biography</a>
	<a id="Comedy" href="#">Comedy</a>
	<a id="Crime" href="#">Crime</a>
	<a id="Documentary" href="#">Documentary</a>
	<a id="Drama" href="#">Drama</a>
	<a id="Family" href="#">Family</a>
	<a id="Fantasy" href="#">Fantasy</a>
	<a id="Film-Noir" href="#">Film-Noir</a>
	<a id="Game-Show" href="#">Game-Show</a>
	<a id="Horror" href="#">Horror</a>
	<a id="Music" href="#">Music</a>
	<a id="Musical" href="#">Musical</a>
	<a id="Mystery" href="#">Mystery</a>
	<a id="News" href="#">News</a>
	<a id="Reality-TV" href="#">Reality-TV</a>
	<a id="Romance" href="#">Romance</a>
	<a id="Sci-Fi" href="#">Sci-Fi</a>
	<a id="Sport" href="#">Sport</a>
	<a id="Talk-Show" href="#">Talk-Show</a>
	<a id="Game-Show" href="#">Game-Show</a>
	<a id="Thriller" href="#">Thriller</a>
	<a id="War" href="#">War</a>
	<a id="Western" href="#">Western</a>
</div>
<div id="results"></div>
<script src="js/searchTorrent.js">
</script>

<script>ajax_get_json(getQueryVariable("id"));</script>

</body>
</html>
<!-- <form method="post" action="https://yts.ag/search-movies" accept-charset="UTF-8">
<input name="_token" type="hidden" value="UZzXxauUHxorVLoOQBJB57aJI7kEaVllrx4E9HpP">
<div id="main-search-fields">
<p class="pull-left term">Search Term:</p>
<input name="keyword" autocomplete="off" type="search">
<div class="selects-container">
<p>Quality:</p>
<select name="quality">
<option value="all">All</option>
<option value="720p">720p</option>
<option value="1080p">1080p</option>
<option value="3D">3D</option>
</select>
</div>
<div class="selects-container">
<p>Genre:</p>
<select name="genre">
<option value="all">All</option>
<option value="action">Action</option>
<option value="adventure">Adventure</option>
<option value="animation">Animation</option>
<option value="biography">Biography</option>
<option value="comedy">Comedy</option>
<option value="crime">Crime</option>
<option value="documentary">Documentary</option>
<option value="drama">Drama</option>
<option value="family">Family</option>
<option value="fantasy">Fantasy</option>
<option value="film-noir">Film-Noir</option>
<option value="game-show">Game-Show</option>
<option value="history">History</option>
<option value="horror">Horror</option>
<option value="music">Music</option>
<option value="musical">Musical</option>
<option value="mystery">Mystery</option>
<option value="news">News</option>
<option value="reality-tv">Reality-TV</option>
<option value="romance">Romance</option>
<option value="sci-fi">Sci-Fi</option>
<option value="sport">Sport</option>
<option value="talk-show">Talk-Show</option>
<option value="thriller">Thriller</option>
<option value="war">War</option>
<option value="western">Western</option>
</select>
</div>
<div class="selects-container">
<p>Rating:</p>
<select name="rating">
<option value="0">All</option>
<option value="9">9+</option>
<option value="8">8+</option>
<option value="7">7+</option>
<option value="6">6+</option>
<option value="5">5+</option>
<option value="4">4+</option>
<option value="3">3+</option>
<option value="2">2+</option>
<option value="1">1+</option>
</select>
</div>
<div class="selects-container selects-container-last">
<p>Order By:</p>
<select name="order_by">
<option value="latest">Latest</option>
<option value="oldest">Oldest</option>
<option value="seeds">Seeds</option>
<option value="peers">Peers</option>
<option value="year">Year</option>
<option value="rating">Rating</option>
<option value="likes">Likes</option>
<option value="alphabetical">Alphabetical</option>
<option value="downloads">Downloads</option>
</select>
</div>
</div>
<div id="main-search-btn">
<input class="button-green-download2-big" type="submit" value="Search">
</div>
</form> -->

*/

/*
movie_preview.html


  <a id="play" href="#">play</a>
  <div  class="hidden" id="playercontainer">
  <video id="player" poster="" src=""></video>
  <div id="controls">
    <div id="progressholder">
      <div id="buffered"></div>
      <div id="progress"></div>
      <div id="progressorb"></div>
    </div>
    <div id="playpause" class="fa fa-play"></div>
    <div id="progresstime">loading...</div>
    <div id="fullscreen" class="fa fa-arrows-alt"></div>
  </div>
</div>
    <h1>Stream From | <a href="movie_search.html?id=test">YTS</a></h1>

</body>


<script>
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }
</script>

<script>
var bg= getQueryVariable("bg");
console.log(bg);
document.getElementById("player").setAttribute("poster",bg);
    var WebTorrent = require('webtorrent-hybrid')
    console.log(getQueryVariable("hash"));
    console.log(getQueryVariable("title"));
    var client = new WebTorrent()
    var torr = "magnet:?xt=urn:btih:" + getQueryVariable("hash") + "&dn=" + getQueryVariable("title") + "&tr=udp://tracker.coppersurfer.tk:6969/announce&tr=udp://tracker.sktorrent.net:6969/announce&tr=udp://tracker.zer0day.to:1337/announce";
    var torrentId = torr;
    // var torrentf = torrent.magnetURI
    // console.log(torrentf)
    client.add(torrentId, function(torrent) {
        // Torrents can contain many files. Let's use the first.
        var file = torrent.files
        torrent.files.forEach(function(file) {
            // file.getBlobURL(function (err, url) {
            //   if (err) throw err
            //   var a = document.createElement('a');
            //   a.download = file.name;
            //   a.href = url;
            //   a.textContent = 'Download ' + file.name;
            //   document.body.appendChild(a);
            //   console.log(url);
            // })
            if (file.name.endsWith(".mp4")) {
                // file.appendTo('body')
                //             file.appendTo('#containerElement', function (err, elem) {
                //   if (err) throw err // file failed to download or display in the DOM
                //   // console.log('New DOM node with the content', elem)
                //
                // })
                var videoElement = document.getElementById("player");
                file.renderTo(videoElement, function(err, elem) {})
            } else {
                console.log('Diffrent source type')
            }
        })
        // Display the file by adding it to the DOM.
        // Supports video, audio, image files, and more!
        // torrent.files.forEach(function(file){
        // do something with file
        // console.log(file.name);
        //  })
        //  console.log(file["name"])
    })

*/