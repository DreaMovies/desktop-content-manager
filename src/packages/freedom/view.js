var ExternalLink = function(link){
	var link_html = '<form class="ui form">' +
		'	<div class="field">' +
		'		<label>External Link</label>' +
		'		<input type="text" name="external-link" id="external-link" placeholder="External Link">' +
		'	</div>' +
		'	<div class="field">' +
		'		<label>Type</label>' +
		'		<div class="ui selection">' +
		'			<select  id="external-type">' +
		'				<option value="">Type</option>' +
		'				<option value="1">WebPage</option>' +
		'				<option value="2">Video</option>' +
		'				<option value="3">Embed</option>' +
		'			</select>' +
		'		</div>' +
		'	</div>' +
		'	<button class="ui button" onclick="freedom.controler.OpenLink()">Submit</button>' +
		'</form>';
	document.getElementById('dynamic-content').innerHTML = '<div class="ui show-content">' + link_html + '</div>';
	$('.dropdown select').dropdown();
};

var ExternalView = function(link, type){
	var content_html = "";
	if(type == "1"){
		content_html = '<iframe class="iframe-external" src="' + link + '" onload="this.style.height=this.contentDocument.body.scrollHeight +\'px\';" webkitallowfullscreen="true" allowfullscreen="true" frameborder="0" scrolling="no"></iframe>';
	} else if(type == "2"){
		content_html = '<video width="320" height="240" controls><source src="' + link + '" type="video/mp4"></video>';
		//https://openload.co/stream/ym7b-E18i54~1520423927~83.240.0.0~P71ysq_1?mime=true
	} else if(type == "3"){
		content_html = '<div class="ui embed" data-url=' + link + '" data-placeholder="/images/image-16by9.png" data-icon="right circle arrow"></div>';
	} else {
		content_html = '<iframe class="iframe-external" src="' + link + '" onload="this.style.height=this.contentDocument.body.scrollHeight +\'px\';" webkitallowfullscreen="true" allowfullscreen="true" frameborder="0" scrolling="no"></iframe>';
	}
	document.getElementById('dynamic-content').innerHTML = '<div class="ui show-content external-content">' + content_html + '</div>';
};

var ExternalVideo = function(){
	//Get video from js
	var ifrm = document.getElementsByTagName('iframe')[0];
	var win = ifrm.contentWindow; // reference to iframe's window
	var doc = ifrm.contentDocument;
	var vi_ifrm = doc.getElementsByTagName('iframe')[0];
	var vi = vi_ifrm.contentDocument;
	var ol_vi = vi_ifrm.contentWindow.videojs('olvideo');
	//check if video started
	console.log(ol_vi.hasStarted());
	//get current percentage 
	(ol_vi.currentTime() * 100 / ol_vi.duration()).toFixed(2) + "%";
	//get time reamining
	var totalNumberOfSeconds = ol_vi.remainingTime();
	var hours = parseInt( totalNumberOfSeconds / 3600 );
	var minutes = parseInt( (totalNumberOfSeconds - (hours * 3600)) / 60 );
	var seconds = Math.floor((totalNumberOfSeconds - ((hours * 3600) + (minutes * 60))));
	var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
	console.log(result);

}

var TorrentView = function(){
	var link_html = '<form class="ui form">' +
		'	<div class="field">' +
		'		<label>Magnetic Link</label>' +
		'		<textarea name="magnetic-link" id="magnetic-link" placeholder="Magnetic Link"></textarea>' +
		'	</div>' +
		'	<button class="ui button" onclick="freedom.controler.OpenTorrent_stream()">Submit</button>' +
		'</form>';
	document.getElementById('dynamic-content').innerHTML = '<div class="ui show-content">' + link_html + '</div>';
};

var TorrentExplorer = function(content_html){
	document.getElementById('dynamic-content').innerHTML = '<div class="ui show-content external-content">' + content_html + '</div>';
}

module.exports = {
	ExternalView: ExternalView,
	ExternalLink: ExternalLink,
	TorrentView: TorrentView,
	TorrentExplorer: TorrentExplorer
}